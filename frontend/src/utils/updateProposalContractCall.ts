import { openContractCall } from "@stacks/connect-react"
import { userSession } from "./authenticate"
import { AnchorMode, stringAsciiCV } from "@stacks/transactions"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
// import { DefaultFormValues } from "@/types"
// import { sha256 } from "js-sha256"
import { Models } from "@/lib/appwrite"
// import getTxUpdate from "./getTxUpdate"
// import { Transaction } from "mongodb"

export type Chain = "mainnet" | "testnet" | "devnet"

export async function updateProposalContractCall(chain: Chain, updatedProposal: Models.Document) {
   // const hash = sha256(JSON.stringify(data))
   const network = chain === "mainnet" ? new StacksMainnet() : new StacksTestnet()

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
         window.open(`https://explorer.hiro.so/txid/${txData.txId}?chain=${chain}`)
      },
      onCancel: async () => {
         alert("You stopped the edit process")
      },
   }

   await openContractCall(txOptions)
}
