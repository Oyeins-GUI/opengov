import { connectWebSocketClient } from "@stacks/blockchain-api-client"
import { databases } from "@/lib/appwrite"

export default async function getTxUpdate(
   txId: string,
   coreApiUrl: string,
   databaseId: string,
   proposalCollection: string,
   proposalId: string,
) {
   const data = await fetch(`${coreApiUrl}/extended/v1/tx/${txId}`)
   const res = await data.json()

   if (res.tx_status === "pending") {
      console.log("tx is still pending...")
   } else if (res.tx_status === "success") {
      console.log("tx successful")
      window.location.reload()
      return
   } else {
      console.log("tx aborted")
      await databases.deleteDocument(databaseId, proposalCollection, proposalId)
      window.location.reload()
      return
   }
}

export async function getTxUpdateWs(
   txId: string,
   // coreApiUrl: string,
   databaseId: string,
   proposalCollection: string,
   proposalId: string,
   chain: "mainnet" | "testnet" | "devnet",
) {
   const client = await connectWebSocketClient(`wss://api.${chain}.hiro.so/`)

   await client.subscribeTxUpdates(`${txId}`, async (event) => {
      console.log(event)
      if (event.tx_status === "pending") {
         console.log("tx is still pending...")
      } else if (event.tx_status === "success") {
         console.log("tx successful")
         return
      } else {
         console.log("tx aborted")
         await databases.deleteDocument(databaseId, proposalCollection, proposalId)
         return
      }
   })
}
