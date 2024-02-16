import { ReactNode } from "react"
import { UseFormRegister } from "react-hook-form"

export type ModalProps = {
   showForm: boolean
   onClose: () => void
   children: ReactNode
}

export type CloseModal = { closeModal: () => void }

export type DefaultFormValues = {
   title: string
   niche: string
   description: string
   milestones: string
   "amount-needed": number
   "amount-gotten": number
   github?: string
   twitter: string
   discord: string
   likes: number
   dislikes: number
   "in-review": boolean
   "additional-resource": string
   "proposer-address": string
}

export type HandleClick = {
   handleClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => unknown
}

export type FormSelect = {
   register: UseFormRegister<DefaultFormValues>
   setError: React.Dispatch<React.SetStateAction<string>>
}
