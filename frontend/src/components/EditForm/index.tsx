import styles from "./edit-form.module.css"
import FormSection from "@/components/FormSection"
import { IoIosClose } from "react-icons/io"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { userSession, authenticate } from "@/utils/authenticate"
import { createProposalContractCall } from "@/utils/createProposalContractCall"
import { useAppSelector } from "@/hooks/useReduxStore"
import InputGroup from "../InputGroup"
import { Models } from "appwrite"
import { DefaultFormValues } from "@/types"
// import { updateProposalContractCall } from "@/utils/updateProposalContractCall"

export default function EditForm({ closeModal, proposal }: { closeModal: () => void; proposal: Models.Document }) {
   const chain = useAppSelector((state) => state.chain.chain)

   const [nicheError, setNicheError] = useState("")
   const defaultFormValues: DefaultFormValues = {
      title: proposal.title,
      niche: proposal.niche,
      description: proposal.description,
      milestones: proposal.milestones,
      "amount-needed": proposal["amount-needed"],
      "amount-gotten": proposal["amount-gotten"],
      github: proposal.github,
      twitter: proposal.twitter,
      discord: proposal.discord,
      likes: proposal.likes,
      dislikes: proposal.dislikes,
      "in-review": proposal["in-review"],
      "additional-resource": proposal["additional-resource"],
      "proposer-address": proposal["proposer-address"],
      chain: proposal.chain,
      reactions: proposal.reactions,
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
            // await updateProposalContractCall(data, chain, proposal)
         }
      }
   }

   return (
      <form method="dialog" noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false" className={styles.form}>
         <div className={styles.form_header}>
            <h3>Edit Proposal</h3>
            <button className={styles.close_modal} onClick={() => closeModal()}>
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
            <input type="text" placeholder="Enter github username" {...register("github")} />
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
            Edit Proposal
         </button>
      </form>
   )
}
