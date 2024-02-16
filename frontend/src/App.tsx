import { useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import LandingPage from "./components/LandingPage"
import { useAppDispatch } from "./hooks/useReduxStore"
import { getProposals } from "./features/proposals/proposalSlice"
import Proposals from "./components/Proposals"

function App() {
   const dispatch = useAppDispatch()

   useEffect(() => {
      dispatch(getProposals())
   }, [dispatch])

   return (
      <>
         <Header />
         <LandingPage />
         <Proposals />
      </>
   )
}

export default App
