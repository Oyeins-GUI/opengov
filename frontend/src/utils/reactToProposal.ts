import { ChainType } from "@/features/chaintype/chainTypeSlice"
import { Proposals, getMainnetProposals, getTestnetProposals } from "@/features/proposals/proposalSlice"
import { Models, databaseId, databases, proposalCollection } from "@/lib/appwrite"
import { Dispatch, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit"
import { authenticate, userSession } from "./authenticate"

type ReactToProposalArgs = {
   proposal: Models.Document
   dispatch: ThunkDispatch<
      {
         chain: ChainType
         proposal: Proposals
      },
      undefined,
      UnknownAction
   > &
      Dispatch<UnknownAction>
   chain: "mainnet" | "testnet" | "devnet"
   userAddress: unknown
}

const reactToProposal = ({ proposal, dispatch, chain, userAddress }: ReactToProposalArgs) => {
   const reactions = JSON.parse(proposal?.reactions) as unknown[]

   return async (type: "like" | "dislike") => {
      if (!userSession.isUserSignedIn()) {
         authenticate()
         return
      }

      if (reactions.includes(userAddress)) {
         alert("You've reacted to this proposal already")
         return
      } else {
         reactions.push(userAddress)

         if (type === "like") {
            const update = await databases.updateDocument(databaseId, proposalCollection, proposal.$id, {
               likes: Number(proposal?.likes) + 1,
               reactions: JSON.stringify(reactions),
            })
            console.log(update)
         } else {
            await databases.updateDocument(databaseId, proposalCollection, proposal.$id, {
               dislikes: Number(proposal?.dislikes) + 1,
               reactions: JSON.stringify(reactions),
            })
         }
      }

      if (chain === "testnet") {
         dispatch(getTestnetProposals())
      } else {
         dispatch(getMainnetProposals())
      }
   }
}

export default reactToProposal
