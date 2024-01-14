import "./modal.css"
import { ReactNode } from "react"
import { IoIosClose } from "react-icons/io"

type ModalProps = {
   showForm: boolean
   onClose: () => void
   children: ReactNode
}

export default function Modal({ showForm, onClose, children }: ModalProps) {
   if (!showForm) return null

   return (
      <>
         <div className="overlay"></div>
         <div className="modal">
            <div className="modal-btn">
               <button className="close-modal" onClick={onClose}>
                  <IoIosClose />
               </button>
            </div>
            <div className="content">{children}</div>
         </div>
      </>
   )
}
