import { openContractCall } from "@stacks/connect-react"
import { userSession } from "./authenticate"
import { AnchorMode, bufferCV, stringAsciiCV } from "@stacks/transactions"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { DefaultFormValues } from "@/types"
import { sha256 } from "js-sha256"
import { databases, databaseId, proposalCollection, ID } from "@/lib/appwrite"

import { defineContract } from "clarity-types"
import { OpengovMainContract } from "../../../contract/contracts/types/opengov"

export type Chain = "mainnet" | "testnet" | "devnet"

export async function createProposalContractCall(data: DefaultFormValues, chain: Chain) {
   const openGovContract = defineContract<OpengovMainContract>({
      contractAddress: "ST16FECHZJPM4Z95D0Y2G7MSPGK0JHHCAE3JT049N",
      contractName: "opengov-alpha",
   })

   const hash = sha256(JSON.stringify(data))
   const uint8Array = new Uint8Array(hash.length)

   const network = chain === "mainnet" ? new StacksMainnet() : new StacksTestnet()

   const createDocument = await databases.createDocument(databaseId, proposalCollection, ID.unique(), data)

   if (!createDocument.$id) return

   if (createDocument.$id) {
      await openContractCall({
         ...openGovContract.callOptions({
            functionName: "create-proposal",
            functionArgs: [stringAsciiCV(createDocument.$id), bufferCV(uint8Array)],
         }),
         senderKey: userSession.loadUserData().appPrivateKey,
         network,
         postConditions: [],
         anchorMode: AnchorMode.Any,
         onFinish: async (txData: { txId: unknown }) => {
            window.open(`https://explorer.hiro.so/txid/${txData.txId}?chain=testnet`)
            alert("Your proposal will show up once the tx is confirmed")
         },
         onCancel: async () => {
            await databases.deleteDocument(databaseId, proposalCollection, createDocument.$id)

            alert("You cancelled the transaction")
         },
      })
   }
}
