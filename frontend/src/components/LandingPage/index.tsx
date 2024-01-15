import "./landing-page.css"
import { GrAdd } from "react-icons/gr"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import ProposalForm from "../ProposalForm"
// import { userSession, authenticate } from "../../utils/authenticate"
import Categories from "../Categories"

export default function LandingPage() {
   const [showCategories, setShowCategories] = useState(true)
   const dialogRef = useRef<HTMLDialogElement>(null)
   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => e.target.getAttribute("data-name")
   const openModal = () => {
      dialogRef.current?.showModal()
   }
   const closeModal = () => {
      dialogRef.current?.close()
   }

   return (
      <>
         <section className="section">
            <h1>Decentralized Funding Network for Projects on Stacks</h1>
            <p className="one-liner">OpenGov: Giving your project the push it deserves</p>
            <button className="categories-btn" type="button" onClick={() => setShowCategories((prev) => !prev)}>
               <p>{showCategories ? "Hide" : "Show"} Categories</p>
               {showCategories ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            <div className="categories">{showCategories && <Categories handleClick={handleClick} />}</div>
            <div className="actions">
               <div className="treasury">
                  <p>View treasury</p>
               </div>
               {/* <div className="create" onClick={() => (userSession.isUserSignedIn() ? openModal() : authenticate())}> */}
               <div className="create" onClick={() => openModal()}>
                  <GrAdd />
                  <p>Create a proposal</p>
               </div>
            </div>
         </section>
         {createPortal(
            <dialog className="modal" ref={dialogRef}>
               <ProposalForm closeModal={closeModal} />
            </dialog>,
            document.getElementById("portal")!,
         )}
      </>
   )
}
