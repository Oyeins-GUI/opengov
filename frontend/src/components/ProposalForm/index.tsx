import "./form.css"
import FormSection from "@/components/FormSection"
import { IoIosClose } from "react-icons/io"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { DefaultFormValues, CloseModal } from "@/types"
import { userSession, authenticate } from "@/utils/authenticate"
import { createProposalContractCall } from "@/utils/createProposalContractCall"
import { useAppSelector } from "@/hooks/useReduxStore"

export default function ProposalForm({ closeModal }: CloseModal) {
   const chain = useAppSelector((state) => state.chain.chain)

   const [nicheError, setNicheError] = useState("")
   const defaultFormValues: DefaultFormValues = {
      title: "",
      niche: "none",
      problem: "",
      solution: "",
      milestones: "",
      amountNeeded: 500,
      twitter: "",
      discord: "",
      likes: 0,
      dislikes: 0,
      inReview: true,
      additionalResource: "",
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
         closeModal()
         authenticate()
      } else {
         if (data?.niche === "none") {
            setNicheError("Niche is required")
            return
         } else {
            setNicheError("")
            await createProposalContractCall(data, chain)
            reset()
            closeModal()
         }
      }
   }

   return (
      <form method="dialog" noValidate onSubmit={handleSubmit(onSubmit)} autoComplete="false" className="form">
         <div className="form-header">
            <h3>Create a Proposal</h3>
            <button className="close-modal" onClick={closeModal}>
               <IoIosClose />
            </button>
         </div>
         <p>Warning: Make sure you have a BNS name</p>
         <div className="input-group">
            <label htmlFor="title">Title</label>
            <input
               type="text"
               id="title"
               placeholder="Enter proposal title"
               {...register("title", {
                  required: "Title is required",
               })}
            />
            <p className="error">{errors.title?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="niche">Niche</label>
            <FormSection register={register} setError={setNicheError} />
            <p className="error">{nicheError != "" ? nicheError : ""}</p>
         </div>

         <div className="input-group">
            <label htmlFor="Problem">Problem</label>
            <textarea
               id="Problem"
               placeholder="Enter Problem"
               cols={10}
               rows={5}
               {...register("problem", {
                  required: "Problem is required",
                  // minLength: 300,
               })}
            />
            <p className="error">{errors.problem?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="solution">Solution</label>
            <textarea
               id="solution"
               placeholder="Enter solution"
               cols={10}
               rows={5}
               {...register("solution", {
                  required: "Solution is required",
                  // minLength: 150,
               })}
            />
            <p className="error">{errors.solution?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="milestones">Milestones</label>
            <textarea
               id="milestones"
               placeholder="Enter milestones"
               cols={10}
               rows={5}
               {...register("milestones", {
                  required: "Milestone(s) is/are required",
                  // minLength: 150,
               })}
            />
            <p className="error">{errors.milestones?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="amount-needed">Amount Needed ($)</label>
            <input
               type="number"
               id="amount-needed"
               placeholder="Enter amount needed"
               {...register("amountNeeded", {
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
            <p className="error">{errors.amountNeeded?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="twitter">Twitter(X) Username</label>
            <input
               type="text"
               id="twitter"
               placeholder="Provide twitter username"
               {...register("twitter", {
                  required: "Twitter(X) username is required",
               })}
            />
            <p className="error">{errors.twitter?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="discord">Discord Username</label>
            <input
               type="text"
               id="discord"
               placeholder="Provide discord username"
               {...register("discord", {
                  required: "Discord username is required",
               })}
            />
            <p className="error">{errors.discord?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="additional-resource">Additional Resource</label>
            <input
               type="text"
               id="additional-resource"
               placeholder="Enter additional resource"
               {...register("additionalResource")}
            />
         </div>

         <button type="submit" className="form-btn">
            Create Proposal
         </button>
      </form>
   )
}
