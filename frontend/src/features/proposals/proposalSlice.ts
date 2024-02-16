import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Models, databaseId, databases, proposalCollection } from "@/lib/appwrite"

type Proposals = Models.DocumentList<Models.Document> & {
   state: "idle" | "loading" | "done" | "failed"
}

const initialState: Proposals = {
   total: 0,
   documents: [],
   state: "idle",
}

export const proposalSlice = createSlice({
   name: "chain",
   initialState,
   reducers: {},
   extraReducers(builder) {
      builder
         .addCase(getProposals.pending, (state) => {
            state.state = "loading"
         })
         .addCase(getProposals.fulfilled, (state, payload: PayloadAction<Models.DocumentList<Models.Document>>) => {
            state.state = "done"
            state.total = payload.payload.total
            state.documents = payload.payload.documents
         })
         .addCase(getProposals.rejected, (state) => {
            state.state = "failed"
         })
         .addCase(
            filterProposals.fulfilled,
            (
               state,
               payload: PayloadAction<
                  Models.Document[],
                  string,
                  {
                     arg: string
                     requestId: string
                     requestStatus: "fulfilled"
                  },
                  never
               >,
            ) => {
               // console.log({ state, payload })
               state.documents = payload.payload
            },
         )
   },
})

export const getProposals = createAsyncThunk(
   "proposals/get",
   async () => await databases.listDocuments(databaseId, proposalCollection),
)

export const filterProposals = createAsyncThunk("proposals/filter", async (niche: string) => {
   const proposals = await databases.listDocuments(databaseId, proposalCollection)
   return proposals.documents.filter((doc) => doc.niche === niche)
})

// export const { updateProposals, deleteProposal } = proposalSlice.actions
export default proposalSlice.reducer
