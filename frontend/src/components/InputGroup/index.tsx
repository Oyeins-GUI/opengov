import styles from "./input-group.module.css"
import React from "react"
import { FieldError } from "react-hook-form"

export default function InputGroup({
   label,
   error,
   children,
}: {
   label: string
   error: FieldError | string | undefined
   children: React.ReactNode
}) {
   return (
      <div className={styles.input_group}>
         <label htmlFor={styles.title}>{label}</label>
         {children}
         <p className={styles.error}>{typeof error === "string" ? error : error?.message}</p>
      </div>
   )
}
