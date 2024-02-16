import styles from "./proposal.module.css"
import { useParams } from "react-router-dom"
import Header from "../Header"
import useFetchProposal from "@/hooks/useFetchProposal"

export default function Proposal() {
   const { id } = useParams()
   const { proposal, fetchFailed } = useFetchProposal(id)

   if (fetchFailed)
      return (
         <>
            <Header />
            <section className={styles.section}>
               <h1>Invalid Proposal ID - {id}</h1>
            </section>
         </>
      )

   if (proposal === undefined) return

   return (
      <>
         <Header />
         <section className={styles.section}>
            <div className={styles.proposal_info}>
               <div className={styles.info}>
                  <button type="button">{"<"}</button>
                  {proposal!["in-review"] ? <p>review</p> : <p>active</p>}
               </div>
               <div className={styles.amount}>
                  <p className="amount_in_stx">9.32 STX</p>
                  <p className="amount_in_usd">$ 22.30</p>
               </div>
               <div className={styles.actions}>
                  <button type="button">L 0</button>
                  <button type="button">D 0</button>
               </div>
            </div>
         </section>
      </>
   )
}
