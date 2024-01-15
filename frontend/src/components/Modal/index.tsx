import "./modal.css"
import { IoIosClose } from "react-icons/io"
import { ModalProps } from "../../types"

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
