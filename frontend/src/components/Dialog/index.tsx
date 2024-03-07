import styles from "./dialog.module.css"

export default function Dialog({
   children,
   dialogRef,
}: {
   children: React.ReactNode
   dialogRef: React.RefObject<HTMLDialogElement> | undefined
}) {
   return (
      <dialog className={styles.modal} ref={dialogRef}>
         {children}
      </dialog>
   )
}
