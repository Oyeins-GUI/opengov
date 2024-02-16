import styles from "./proposal-card.module.css"
import capitalize from "@/utils/capitalizeWords"
import { getRelativeTime } from "@/utils/getRelativeTime"
import { Models } from "appwrite"
import { Link } from "react-router-dom"

export default function ProposalCard({ proposal }: { proposal: Models.Document }) {
   const timestamp = new Date(proposal.$createdAt).getTime()

   return (
      <>
         <div className={styles.proposals} key={proposal.$id}>
            <div className={styles.proposals_header}>
               <div className={styles.proposals_pic}></div>
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
            </div>
            <div className={styles.proposals_body}>
               <p>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et consectetur voluptates qui? Voluptas hic,
                  fugiat minus enim architecto corrupti accusamus? Excepturi tempora laboriosam voluptatem dolorum
                  repellat ut incidunt facere doloremque. Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Maiores, veniam! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta, ipsam.
               </p>
               <Link to={`/proposal/${proposal.$id}`} className={styles.see_more}>
                  See more
               </Link>
            </div>
         </div>
      </>
   )
}
