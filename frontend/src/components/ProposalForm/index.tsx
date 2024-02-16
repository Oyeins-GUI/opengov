import styles from "./form.module.css"
import FormSection from "@/components/FormSection"
import { IoIosClose } from "react-icons/io"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { DefaultFormValues, CloseModal } from "@/types"
import { userSession, authenticate } from "@/utils/authenticate"
import { createProposalContractCall } from "@/utils/createProposalContractCall"
import { useAppSelector } from "@/hooks/useReduxStore"
import useUserAdress from "@/hooks/useUserAddress"
import InputGroup from "../InputGroup"

export default function ProposalForm({ closeModal }: CloseModal) {
   const chain = useAppSelector((state) => state.chain.chain)
   const userAddress = useUserAdress(chain !== "testnet" ? "testnet" : "mainnet")

   const [nicheError, setNicheError] = useState("")
   const defaultFormValues: DefaultFormValues = {
      title: "",
      niche: "none",
      description: "",
      milestones: "",
      "amount-needed": 500,
      "amount-gotten": 0,
      github: "",
      twitter: "",
      discord: "",
      likes: 0,
      dislikes: 0,
      "in-review": true,
      "additional-resource": "",
      "proposer-address": userAddress,
   }
   const {
      formState: { errors },
      register,
      handleSubmit,
      reset,
   } = useForm({
      defaultValues: defaultFormValues,
   })

   const onSubmit = async (data: DefaultFormValues) => {
      if (!userSession.isUserSignedIn()) {
         authenticate()
      } else {
         if (data?.niche === "none") {
            setNicheError("Niche is required")
            return
         } else {
            setNicheError("")
            reset()
            // closeModal()
            await createProposalContractCall(data, chain)
         }
      }
   }

   return (
      <form method="dialog" noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false" className={styles.form}>
         <div className={styles.form_header}>
            <h3>Create a Proposal</h3>
            <button className={styles.close_modal} onClick={closeModal}>
               <IoIosClose />
            </button>
         </div>

         <InputGroup label="Title" error={errors.title}>
            <input
               type="text"
               placeholder="Enter proposal title"
               {...register("title", {
                  required: "Title is required",
               })}
            />
         </InputGroup>

         <InputGroup label="Niche" error={nicheError != "" ? nicheError : ""}>
            <FormSection register={register} setError={setNicheError} />
         </InputGroup>

         <InputGroup label="Description" error={errors.description}>
            <textarea
               placeholder="Description should include the problem and solution"
               cols={10}
               rows={5}
               {...register("description", {
                  required: "Description is required",
               })}
            />
         </InputGroup>

         <InputGroup label="Milestones" error={errors.milestones}>
            <textarea
               placeholder="Enter milestones"
               cols={10}
               rows={5}
               {...register("milestones", {
                  required: "Milestone(s) is/are required",
               })}
            />
         </InputGroup>

         <InputGroup label="Amount Needed ($)" error={errors["amount-needed"]}>
            <input
               type="number"
               placeholder="Enter amount needed"
               {...register("amount-needed", {
                  required: "Amount needed is required",
                  max: {
                     message: "Must not be greater than 2500",
                     value: 5000,
                  },
                  min: {
                     message: "Must not be less than 500",
                     value: 500,
                  },
               })}
            />
         </InputGroup>

         <InputGroup label="Github" error={errors.github}>
            <input type="text" placeholder="Enter github url" {...register("github")} />
         </InputGroup>

         <InputGroup label="Twitter(X) Username" error={errors.twitter}>
            <input
               type="text"
               placeholder="Provide twitter username"
               {...register("twitter", {
                  required: "Twitter(X) username is required",
               })}
            />
         </InputGroup>

         <InputGroup label="Discord Username" error={errors.discord}>
            <input
               type="text"
               placeholder="Provide discord username"
               {...register("discord", {
                  required: "Discord username is required",
               })}
            />
         </InputGroup>

         <InputGroup label="Additional Resource" error={errors.discord}>
            <input type="text" placeholder="Enter additional resource" {...register("additional-resource")} />
         </InputGroup>

         <button type="submit" className={styles.form_btn}>
            Create Proposal
         </button>
      </form>
   )
}
