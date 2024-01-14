import "./header.css"
import logo from "../../assets/opengov-logo2.png"
import { useAppDispatch } from "../../hooks/useReduxStore"
import { changeToMainnet, changeToTestnet } from "../../features/chaintype/chainTypeSlice"
import ConnectWallet from "../ConnectWallet"

export default function Header() {
   const dispatch = useAppDispatch()
   const changeChain = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target
      if (value === "mainnet") dispatch(changeToMainnet())
      else dispatch(changeToTestnet())
   }

   return (
      <>
         <header className="header">
            <div className="sidebar">
               <div className="logo">
                  <img src={logo} alt="logo" />
               </div>
               <p className="name">OpenGov</p>
            </div>
            <div className="chain-options flex">
               <select name="chain-type" id="chain-type" className="chain" onChange={changeChain}>
                  <option value="mainnet">Mainnet</option>
                  <option value="testnet">Testnet</option>
               </select>
               <ConnectWallet />
            </div>
         </header>
      </>
   )
}
