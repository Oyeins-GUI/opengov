import { openContractCall } from "@stacks/connect-react"
import { userSession } from "./authenticate"
import { AnchorMode, stringAsciiCV } from "@stacks/transactions"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { DefaultFormValues } from "@/types"
// import { sha256 } from "js-sha256"
import { databases, databaseId, proposalCollection, ID } from "@/lib/appwrite"
import getTxUpdate, { getTxUpdateWs } from "./getTxUpdate"

export type Chain = "mainnet" | "testnet" | "devnet"

export async function createProposalContractCall(data: DefaultFormValues, chain: Chain) {
   // const hash = sha256(JSON.stringify(data))

   const network = chain === "mainnet" ? new StacksMainnet() : new StacksTestnet()

   const createDocument = await databases.createDocument(databaseId, proposalCollection, ID.unique(), data)

   if (!createDocument.$id) return

   if (createDocument.$id) {
      const txOptions = {
         contractAddress: "ST16FECHZJPM4Z95D0Y2G7MSPGK0JHHCAE3JT049N",
         contractName: "open-gov-v4",
         functionName: "create-proposal",
         functionArgs: [stringAsciiCV("title"), stringAsciiCV("niche"), stringAsciiCV("description")],
         senderKey: userSession.loadUserData().appPrivateKey,
         validateWithAbi: true,
         network,
         postConditions: [],
         anchorMode: AnchorMode.Any,
         onFinish: async (txData: { txId: unknown }) => {
            window.open(`https://explorer.hiro.so/txid/${txData.txId}?chain=testnet`)

            getTxUpdateWs(`${txData.txId}`, databaseId, proposalCollection, createDocument.$id, chain)

            setInterval(
               () =>
                  getTxUpdate(`${txData.txId}`, network.coreApiUrl, databaseId, proposalCollection, createDocument.$id),
               60000,
            )
         },
         onCancel: async () => {
            await databases.deleteDocument(databaseId, proposalCollection, createDocument.$id)

            alert("You cancelled the transaction")
         },
      }

      await openContractCall(txOptions)
   }
}
