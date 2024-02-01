import { openContractCall } from "@stacks/connect-react"
import { storage, userSession } from "./authenticate"
import { AnchorMode, stringAsciiCV } from "@stacks/transactions"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import { DefaultFormValues } from "@/types"

type Chain = "mainnet" | "testnet" | "devnet"

export async function createProposalContractCall(data: DefaultFormValues, chain: Chain) {
   console.log(data)

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
      onFinish: (txData: { txId: unknown }) => {
         console.log("Transaction ID:", `0x${txData.txId}`)
         const fileUrl = storage.putFile("proposal.json", JSON.stringify(data))

         console.log(fileUrl)
      },
   }

   await openContractCall(txOptions)
}
