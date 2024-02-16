import styles from "./modal.module.css"
import { IoIosClose } from "react-icons/io"
import { ModalProps } from "@/types"

export default function Modal({ showForm, onClose, children }: ModalProps) {
   if (!showForm) return null

   return (
      <>
         <div className={styles.overlay}></div>
         <div className={styles.modal}>
            <div className={styles.modal_btn}>
               <button className={styles.close_modal} onClick={onClose}>
                  <IoIosClose />
               </button>
            </div>
            <div className={styles.content}>{children}</div>
         </div>
      </>
   )
}
