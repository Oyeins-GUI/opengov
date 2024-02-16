import styles from "./connect.module.css"
import stacksLogo from "@/assets/stacks-stx-logo.png"
import { useAppSelector } from "@/hooks/useReduxStore"
import { RiArrowDropDownLine } from "react-icons/ri"
import { userSession, authenticate, disconnect } from "@/utils/authenticate"
import useUserAdress from "@/hooks/useUserAddress"
import { useState } from "react"
import { truncateAddress } from "@/utils/truncateAddress"

export default function ConnectWallet() {
   const [show, setShow] = useState(false)
   const chain = useAppSelector((state) => state.chain.chain)
   const addressDisplayed = truncateAddress(useUserAdress(chain))

   if (userSession.isUserSignedIn()) {
      return (
         <div className={`${styles.user} ${styles.flex}`}>
            <button className={`${styles.user_address} ${styles.flex}`} onClick={() => setShow((prev) => !prev)}>
               <img src={stacksLogo} alt="stacks logo" />
               <p>{addressDisplayed}</p>
               <RiArrowDropDownLine />
            </button>
            {show && (
               <button
                  type="button"
                  className={`${styles.disconnect}`}
                  onClick={() => {
                     disconnect()
                  }}
               >
                  Disconnect
               </button>
            )}
         </div>
      )
   }

   return (
      <button
         className={`${styles.connect}`}
         onClick={() => {
            authenticate()
         }}
      >
         Connect Wallet
      </button>
   )
}
