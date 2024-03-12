import styles from "./proposal.module.css"
import { useParams } from "react-router-dom"
import Header from "../Header"
import useFetchProposal from "@/hooks/useFetchProposal"
import { FaArrowLeft, FaThumbsDown, FaThumbsUp, FaPen, FaTrashCan } from "react-icons/fa6"
import capitalize from "@/utils/capitalizeWords"
import formatNumber from "@/utils/formatNumber"
import useUserAdress from "@/hooks/useUserAddress"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxStore"
import reactToProposal from "@/utils/reactToProposal"
import Dialog from "../Dialog"
import { useRef } from "react"
import EditForm from "../EditForm"

export default function Proposal() {
   const { id } = useParams()
   const { proposal, fetchFailed } = useFetchProposal(id)
   const chain = useAppSelector((state) => state.chain.chain)
   const dispatch = useAppDispatch()
   const userAddress = useUserAdress(chain)
   const dialogRef = useRef<HTMLDialogElement>(null)

   const openModal = () => {
      dialogRef.current?.showModal()
   }
   const closeModal = () => {
      dialogRef.current?.close()
   }

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

   const react = reactToProposal({ proposal, dispatch, chain, userAddress })

   return (
      <>
         <Header />
         <section className={styles.section}>
            <div className={`${styles.proposal_info}`}>
               <div className={styles.flex}>
                  <div className={`${styles.info} ${styles.flex}`}>
                     <button type="button" onClick={() => history.back()}>
                        <FaArrowLeft />
                     </button>
                     {<p className={styles.title}>{capitalize(proposal?.title)}</p>}
                  </div>
                  <div className={`${styles.amount} ${styles.flex}`}>
                     <p className={`${styles.amount_in_stx}`}>{formatNumber(proposal["amount-needed"], "comma")} STX</p>
                     <p className={styles.amount_in_usd}>{formatNumber(proposal["amount-gotten"])}</p>
                  </div>

                  <div className={`${styles.reactions} ${styles.flex}`}>
                     <button className={styles.btn} onClick={() => react("like")}>
                        <FaThumbsUp /> {proposal.likes}
                     </button>
                     <button className={styles.btn} onClick={() => react("dislike")}>
                        <FaThumbsDown /> {proposal.dislikes}
                     </button>
                  </div>
               </div>

               <div className={`${styles.actions} ${styles.flex}`}>
                  <button type="button" className={styles.delegate}>
                     Delegate
                  </button>
                  {proposal["proposer-address"] === userAddress && (
                     <button type="button" className={styles.edit} onClick={() => openModal()}>
                        <FaPen /> Edit
                     </button>
                  )}
                  <Dialog dialogRef={dialogRef}>
                     <EditForm closeModal={closeModal} proposal={proposal} />
                  </Dialog>
               </div>
            </div>

            <div className={styles.overview}>
               <h5>Description:</h5>
               <p className={styles.description}>{proposal.description}</p>

               <h5>Milestones:</h5>
               <p className={styles.miletones}>{proposal.milestones}</p>
            </div>

            {proposal["proposer-address"] === userAddress && (
               <div className={styles.delete_proposal}>
                  <button type="button" className={styles.delete}>
                     <FaTrashCan />
                     Delete this proposal
                  </button>
               </div>
            )}
         </section>
      </>
   )
}
