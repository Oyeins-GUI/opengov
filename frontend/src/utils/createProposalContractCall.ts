import { openContractCall } from "@stacks/connect-react"
import { userSession } from "./authenticate"
import { AnchorMode, stringAsciiCV } from "@stacks/transactions"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { DefaultFormValues } from "@/types"
// import { sha256 } from "js-sha256"
import { databases, databaseId, proposalCollection, ID } from "@/lib/appwrite"

type Chain = "mainnet" | "testnet" | "devnet"

export async function createProposalContractCall(data: DefaultFormValues, chain: Chain) {
   // const hash = sha256(JSON.stringify(data))

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
         network: chain === "mainnet" ? new StacksMainnet() : new StacksTestnet(),
         postConditions: [],
         anchorMode: AnchorMode.Any,
         onFinish: async (txData: { txId: unknown }) => {
            window.open(`https://explorer.hiro.so/txid/0x${txData.txId}?chain=testnet`)
            window.location.reload()
         },
         onCancel: () => {
            alert("You cancelled the transaction")
         },
      }

      await openContractCall(txOptions)
   }
}
