import { useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import LandingPage from "./components/LandingPage"
import { storage, userSession } from "./utils/authenticate"

function App() {
   useEffect(() => {
      async function getFile() {
         if (userSession.isUserSignedIn()) {
            const files: Promise<string | undefined | ArrayBuffer | null>[] = []
            const options = { decrypt: true }
            await storage.listFiles((filename: string) => {
               if (filename === "proposal.json") {
                  files.push(storage.getFile(filename, options))
                  // return false to stop iterating through files
                  return false
               } else {
                  // return true to continue iterating
                  return true
               }
            })
            const fileContents = await Promise.all(files)

            fileContents.forEach((content) => {
               console.log(JSON.parse(content?.toString() as string))
            })
         }
      }
      getFile()
   }, [])

   return (
      <>
         <Header />
         <LandingPage />
      </>
   )
}

export default App
