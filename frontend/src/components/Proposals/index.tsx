import styles from "./proposals.module.css"
import ProposalCard from "../ProposalCard"
import { Models } from "appwrite"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxStore"
import { useSearchParams } from "react-router-dom"
import { useEffect } from "react"
import { filterProposals } from "@/features/proposals/proposalSlice"

export default function Proposals() {
   const proposals = useAppSelector((state) => state.proposal.documents)
   // const chain = useAppSelector((state) => state.chain.chain)
   const dispatch = useAppDispatch()
   const [searchParams] = useSearchParams()

   useEffect(() => {
      if (searchParams.get("niche") !== null) {
         dispatch(filterProposals(searchParams.get("niche") as string))
      }
   }, [dispatch, searchParams])

   return (
      <section id="proposals" className={styles.proposal_section}>
         <h3>Proposals</h3>

         <div className={styles.proposals}>
            {proposals.map((proposal: Models.Document) => {
               return <ProposalCard proposal={proposal} key={proposal.$id} />
            })}
         </div>
      </section>
   )
}
