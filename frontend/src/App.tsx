import "./App.css"

import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "./hooks/useReduxStore"
import { getTestnetProposals, getMainnetProposals } from "./features/proposals/proposalSlice"

import Header from "./components/Header"
import LandingPage from "./components/LandingPage"
import Proposals from "./components/Proposals"

function App() {
   const chain = useAppSelector(({ chain: { chain } }) => chain)
   const dispatch = useAppDispatch()

   useEffect(() => {
      if (chain === "mainnet") {
         dispatch(getMainnetProposals())
      } else {
         dispatch(getTestnetProposals())
      }
   }, [dispatch, chain])

   return (
      <>
         <Header />
         <LandingPage />
         <Proposals />
      </>
   )
}

export default App
