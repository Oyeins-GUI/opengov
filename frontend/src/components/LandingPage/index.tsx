import styles from "./landing-page.module.css"
import { GrAdd } from "react-icons/gr"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import ProposalForm from "../ProposalForm"
import Categories from "../Categories"
import { useSearchParams } from "react-router-dom"
import Dialog from "../Dialog"

export default function LandingPage() {
   const [showCategories, setShowCategories] = useState(true)
   const dialogRef = useRef<HTMLDialogElement>(null)
   const [, setSearchParams] = useSearchParams()

   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = e.target as HTMLButtonElement
      const niche = target.getAttribute("data-name")

      if (niche === null) {
         setSearchParams("")
         return
      }

      setSearchParams(`niche=${niche}`)
   }

   const openModal = () => {
      dialogRef.current?.showModal()
   }
   const closeModal = () => {
      dialogRef.current?.close()
   }

   return (
      <>
         <section className={styles.section}>
            <h1>Decentralized Funding Network for Projects on Stacks</h1>
            <p className={styles.one_liner}>OpenGov: Giving your project the push it deserves</p>
            <button className={styles.categories_btn} type="button" onClick={() => setShowCategories((prev) => !prev)}>
               <p>{showCategories ? "Hide" : "Show"} Categories</p>
               {showCategories ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            <div className={styles.categories}>{showCategories && <Categories handleClick={handleClick} />}</div>
            <div className={styles.actions}>
               <div className={styles.treasury}>
                  <p>View treasury</p>
               </div>
               <div className={styles.create} onClick={() => openModal()}>
                  <GrAdd />
                  <p>Create a proposal</p>
               </div>
            </div>
         </section>

         {createPortal(
            <Dialog dialogRef={dialogRef}>
               <ProposalForm closeModal={closeModal} />
            </Dialog>,
            document.getElementById("portal")!,
         )}
      </>
   )
}
