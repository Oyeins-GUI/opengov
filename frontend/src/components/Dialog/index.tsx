import styles from "./dialog.module.css"

export default function Dialog({
   children,
   dialogRef,
}: {
   children: React.ReactNode
   dialogRef: React.RefObject<HTMLDialogElement>
}) {
   return (
      <dialog className={styles.modal} ref={dialogRef}>
         {children}
      </dialog>
   )
}
