import styles from "./header.module.css"
import logo from "@/assets/opengov-logo2.png"
import { useAppDispatch } from "@/hooks/useReduxStore"
import { changeToMainnet, changeToTestnet } from "@/features/chaintype/chainTypeSlice"
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
         <header className={styles.header}>
            <div className={styles.sidebar}>
               <div className={styles.logo}>
                  <img src={logo} alt="logo" />
               </div>
               <p className={styles.name}>OpenGov</p>
            </div>
            <div className={`${styles.chain_options} ${styles.flex}`}>
               <select name="chain-type" id="chain-type" className={styles.chain} onChange={changeChain}>
                  <option value="testnet">Testnet</option>
                  <option value="mainnet">Mainnet</option>
               </select>
               <ConnectWallet />
            </div>
         </header>
      </>
   )
}
