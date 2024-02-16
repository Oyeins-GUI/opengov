import { Models, databaseId, databases, proposalCollection } from "@/lib/appwrite"
import { Query } from "appwrite"
import { useEffect, useState } from "react"

export default function useFetchProposal(id: string | undefined) {
   const [proposal, setProposal] = useState<Models.Document>()
   const [fetchFailed, setFetchFailed] = useState(false)

   useEffect(() => {
      const fetchProposal = async () => {
         if (id === undefined) return

         const data = await databases.listDocuments(databaseId, proposalCollection, [Query.equal("$id", [`${id}`])])

         if (data.total === 0 || data.documents.length === 0) {
            setFetchFailed(true)
            return
         }

         setFetchFailed(false)
         setProposal(data.documents[0])
      }

      fetchProposal()
   }, [id])

   return { proposal, fetchFailed }
}
