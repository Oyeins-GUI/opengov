import "./connect.css"
import stacksLogo from "../../assets/stacks-stx-logo.png"
import { useAppSelector } from "../../hooks/useReduxStore"
import { RiArrowDropDownLine } from "react-icons/ri"
import { userSession, authenticate, disconnect } from "../../utils/authenticate"
import useUserAdress from "../../hooks/useUserAddress"
import { useState } from "react"

export default function ConnectWallet() {
   const [show, setShow] = useState(false)
   const chain = useAppSelector((state) => state.chain.chain)
   const addressDisplayed = useUserAdress(chain)

   if (userSession.isUserSignedIn()) {
      return (
         <div className="user flex">
            <div className="user-address flex" onClick={() => setShow((prev) => !prev)}>
               <img src={stacksLogo} alt="stacks logo" />
               <p>{addressDisplayed}</p>
               <RiArrowDropDownLine />
            </div>
            {show && (
               <button
                  type="button"
                  className="disconnect"
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
         className="connect"
         onClick={() => {
            authenticate()
         }}
      >
         Connect Wallet
      </button>
   )
}
