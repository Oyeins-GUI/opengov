import styles from "./landing-page.module.css"
import { GrAdd } from "react-icons/gr"
import { FaAngleDown, FaAngleUp } from "react-icons/fa6"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"
import ProposalForm from "../ProposalForm"
import Categories from "../Categories"
import { useSearchParams } from "react-router-dom"
import Dialog from "../Dialog"
import { useForm } from "react-hook-form"
import { openSTXTransfer } from "@stacks/connect-react"
import { useAppSelector } from "@/hooks/useReduxStore"
import { StacksMainnet, StacksTestnet } from "@stacks/network"
import InputGroup from "../InputGroup"

export default function LandingPage() {
   const [showCategories, setShowCategories] = useState(true)
   const dialogRef = useRef<HTMLDialogElement>(null)
   const treasuryDialogRef = useRef<HTMLDialogElement>(null)
   const [, setSearchParams] = useSearchParams()

   const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      const target = e.target as HTMLButtonElement
      const niche = target.getAttribute("data-name")

      if (niche === null) {
         setSearchParams("")
         return
      }

      setSearchParams(`niche=${niche}`)
   }

   const openTreasuryModal = () => {
      treasuryDialogRef.current?.showModal()
   }
   const closeTreasuryModal = () => {
      treasuryDialogRef.current?.close()
   }
   const openModal = () => {
      dialogRef.current?.showModal()
   }
   const closeModal = () => {
      dialogRef.current?.close()
   }

   return (
      <>
         <section className={styles.section}>
            <h1>Decentralized Funding Network for Projects on Stacks</h1>
            <p className={styles.one_liner}>OpenGov: Giving your project the push it deserves</p>
            <button className={styles.categories_btn} type="button" onClick={() => setShowCategories((prev) => !prev)}>
               <p>{showCategories ? "Hide" : "Show"} Categories</p>
               {showCategories ? <FaAngleUp /> : <FaAngleDown />}
            </button>
            <div className={styles.categories}>{showCategories && <Categories handleClick={handleClick} />}</div>
            <div className={styles.actions}>
               <div className={styles.treasury} onClick={() => openTreasuryModal()}>
                  <p>View treasury</p>
               </div>
               <div className={styles.create} onClick={() => openModal()}>
                  <GrAdd />
                  <p>Create a proposal</p>
               </div>
            </div>
         </section>

         {createPortal(
            <Dialog dialogRef={treasuryDialogRef}>
               <Treasury closeModal={closeTreasuryModal} />
            </Dialog>,
            document.getElementById("portal")!,
         )}

         {createPortal(
            <Dialog dialogRef={dialogRef}>
               <ProposalForm closeModal={closeModal} />
            </Dialog>,
            document.getElementById("portal")!,
         )}
      </>
   )
}

function Treasury({ closeModal }: { closeModal: () => void }) {
   const chain = useAppSelector(({ chain }) => chain.chain)
   const treasuryAddress =
      chain === "mainnet"
         ? import.meta.env.VITE_TREASURY_ADDRESS_MAINNET
         : import.meta.env.VITE_TREASURY_ADDRESS_TESTNET

   const form = useForm({
      defaultValues: {
         amount: "",
      },
   })
   const { handleSubmit, register, formState } = form
   const { errors } = formState
   const onSubmit = (data: { amount: string }) => {
      const { amount } = data
      fundTreasuryPool(Number(amount))
   }

   const [poolBalance, setPoolBalance] = useState<UserBalanceObj>()

   useEffect(() => {
      async function getPoolBalance() {
         const response = await fetch(`https://api.${chain}.hiro.so/extended/v1/address/${treasuryAddress}/stx`)
         const data: UserBalanceObj = await response.json()
         setPoolBalance(data)
      }

      getPoolBalance()
   }, [chain, treasuryAddress])

   const fundTreasuryPool = async (amount: number) => {
      openSTXTransfer({
         recipient: treasuryAddress,
         amount: `${amount * 1000000}`,
         memo: "pool funding",
         network: chain === "mainnet" ? new StacksMainnet() : new StacksTestnet(),
         onFinish: (data) => {
            console.log("Stacks Transaction:", data.stacksTransaction)
            console.log("Transaction ID:", data.txId)
            console.log("Raw transaction:", data.txRaw)
         },
      })
   }

   return (
      <div style={{ color: "white", minWidth: "320px", textAlign: "center" }}>
         <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h1>Treasury</h1>
            <button
               type="button"
               style={{ border: "none", outline: "none", color: "white", background: "none", fontSize: "1.5rem" }}
               onClick={() => closeModal()}
            >
               x
            </button>
         </div>

         <h5 style={{ marginTop: "10px" }}>Pool's Treasury</h5>
         <p>{Number(poolBalance?.balance) / 1_000_000}STX</p>
         <br />
         <p>Do you want to fund the treasury?</p>

         <form noValidate onSubmit={handleSubmit(onSubmit)}>
            <InputGroup label="" error={undefined}>
               <input
                  type="number"
                  placeholder="Enter amount in STX"
                  style={{ margin: "10px auto 0 auto" }}
                  autoFocus
                  {...register("amount", {
                     required: "Amount is required",
                     min: {
                        value: 1,
                        message: "Amount must be greater than 0",
                     },
                  })}
               />
               <p style={{ color: "red", fontSize: "11px" }}>{errors.amount?.message}</p>
            </InputGroup>
            <button type="submit">Send Fund</button>
         </form>
      </div>
   )
}

type UserBalanceObj = {
   balance: string
   burnchain_lock_height: number
   burnchain_unlock_height: number
   lock_height: number
   lock_tx_id: string
   locked: string
   total_fees_sent: string
   total_miner_rewards_received: string
   total_received: string
   total_sent: string
}
