import styles from "./proposal-card.module.css"
import capitalize from "@/utils/capitalizeWords"
import { getRelativeTime } from "@/utils/getRelativeTime"
import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { FaXTwitter, FaGithub, FaCopy, FaThumbsUp, FaThumbsDown } from "react-icons/fa6"
import useUserAdress from "@/hooks/useUserAddress"
import { useAppDispatch, useAppSelector } from "@/hooks/useReduxStore"
import reactToProposal from "@/utils/reactToProposal"

export default function ProposalCard({ proposal }: { proposal: Models.Document }) {
   const timestamp = new Date(proposal.$createdAt).getTime()
   const baseURL = "http://localhost:5173/proposal"
   const URL = `${baseURL}/${proposal.$id}`
   const copyProposalURL = async () => {
      try {
         await navigator.clipboard.writeText(URL)
         alert("Proposal URL has been copied to clipboard")
      } catch (err) {
         alert(`Failed to copy URL: ${err}`)
      }
   }
   const chain = useAppSelector((state) => state.chain.chain)
   const dispatch = useAppDispatch()
   const userAddress = useUserAdress(chain)

   const react = reactToProposal({ proposal, dispatch, chain, userAddress })

   return (
      <>
         <div className={styles.proposals} key={proposal.$id}>
            <div className={styles.proposals_header}>
               {/* <div className={styles.proposals_pic}></div> */}
               <div className={styles.proposals_info}>
                  <h5>{capitalize(proposal.title)}</h5>
                  <p>
                     {capitalize(proposal.niche)} • {getRelativeTime(timestamp)}
                  </p>
                  {proposal["in-review"] ? (
                     <>
                        <div className={styles.status}>
                           <div className={`${styles.indicator} ${styles.review}`}></div>
                           <p>In-review</p>
                        </div>
                     </>
                  ) : (
                     <>
                        <div className={styles.status}>
                           <div className={`${styles.indicator} ${styles.active}`}></div>
                           <p>Active</p>
                        </div>
                     </>
                  )}
               </div>
               <div className={styles.proposal_header_actions}>
                  <button className={`${styles.btn}`} onClick={() => react("like")}>
                     <FaThumbsUp /> {proposal.likes}
                  </button>
                  <button className={`${styles.btn}`} onClick={() => react("dislike")}>
                     <FaThumbsDown /> {proposal.dislikes}
                  </button>
               </div>
            </div>
            <div className={styles.proposals_body}>
               <p>{proposal.description}</p>
               <Link to={`/proposal/${proposal.$id}`} className={styles.see_more}>
                  See more
               </Link>
            </div>
            <div className={styles.footer}>
               <div className={styles.amount_needed}>Needed: ${proposal["amount-needed"]}</div>
               <div className={styles.amount_gotten}>Gotten: ${proposal["amount-gotten"]}</div>
               <div className={styles.card_actions}>
                  <a href={`https://x.com/${proposal?.twitter}`} target="_blank">
                     <FaXTwitter />
                  </a>
                  {proposal?.github !== "" && (
                     <a href={`https://github.com/${proposal?.github}`} target="_blank">
                        <FaGithub />
                     </a>
                  )}

                  <button type="button" onClick={() => copyProposalURL()}>
                     <FaCopy />
                  </button>
               </div>
            </div>
         </div>
      </>
   )
}
