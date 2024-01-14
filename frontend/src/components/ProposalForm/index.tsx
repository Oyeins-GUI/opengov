import "./form.css"
import FormSection from "../FormSection"
import { IoIosClose } from "react-icons/io"
import { useForm } from "react-hook-form"
import { sha256 } from "js-sha256"
import { useState } from "react"

type CloseModal = { closeModal: () => void }
export type DefaultFormValues = {
   title: string
   niche: string
   description: string
   amountNeeded: number
   additionalResource: string
   img: string
   twitter: string
   discord: string
}

export default function ProposalForm({ closeModal }: CloseModal) {
   const [nicheError, setNicheError] = useState("")
   const defaultFormValues: DefaultFormValues = {
      title: "",
      niche: "none",
      description: "",
      amountNeeded: 500,
      additionalResource: "",
      img: "",
      twitter: "",
      discord: "",
   }
   const {
      formState: {
         errors: { amountNeeded, description, title },
      },
      register,
      handleSubmit,
   } = useForm({
      defaultValues: defaultFormValues,
   })

   const onSubmit = (data: DefaultFormValues) => {
      if (data?.niche === "none") {
         setNicheError("Niche is required")
         return
      } else {
         setNicheError("")
         const dataString = JSON.stringify(data)
         const hash = sha256(dataString)
         console.log({ dataString, hash })
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
            <p className="error">{title?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="niche">Niche</label>
            <FormSection register={register} setError={setNicheError} />
            <p className="error">{nicheError != "" ? nicheError : ""}</p>
         </div>

         <div className="input-group">
            <label htmlFor="description">Description</label>
            <textarea
               id="description"
               placeholder="Enter description"
               cols={10}
               rows={5}
               {...register("description", {
                  required: "Description is required",
               })}
            />
            <p className="error">{description?.message}</p>
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
                     value: 2500,
                  },
                  min: {
                     message: "Must not be less than 500",
                     value: 500,
                  },
               })}
            />
            <p className="error">{amountNeeded?.message}</p>
         </div>

         <div className="input-group">
            <label htmlFor="twitter">Twitter(X) Username</label>
            <input type="text" id="twitter" placeholder="Provide twitter username" {...register("twitter")} />
         </div>

         <div className="input-group">
            <label htmlFor="discord">Discord Username</label>
            <input type="text" id="discord" placeholder="Provide discord username" {...register("discord")} />
         </div>

         <div className="input-group">
            <label htmlFor="file">Additional Resource</label>
            <input
               type="text"
               id="additional-resource"
               placeholder="Enter additional resource"
               {...register("additionalResource")}
            />
         </div>

         <div className="input-group">
            <label htmlFor="file">Image</label>
            <input type="file" id="file" accept="image/png, image/jpg, image/jpeg" {...register("img", {})} />
         </div>
         <button type="submit" className="form-btn">
            Create Proposal
         </button>
      </form>
   )
}
