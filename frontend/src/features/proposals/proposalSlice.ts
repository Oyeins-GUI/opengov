import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Models, databaseId, databases, proposalCollection } from "@/lib/appwrite"
import { Query } from "appwrite"

export type Proposals = Models.DocumentList<Models.Document> & {
   state: "idle" | "loading" | "done" | "failed"
}

const initialState: Proposals = {
   total: 0,
   documents: [],
   state: "idle",
}

export const proposalSlice = createSlice({
   name: "proposals",
   initialState,
   reducers: {
      filterProposals(state, payload) {
         console.log(payload.payload)

         const filteredProposals = state.documents.filter((doc) => doc.niche === payload.payload)
         state.documents = filteredProposals
         state.total = filteredProposals.length
      },
   },
   extraReducers(builder) {
      builder
         .addCase(getMainnetProposals.pending, (state) => {
            state.state = "loading"
         })
         .addCase(getMainnetProposals.fulfilled, (state, payload) => {
            state.state = "done"
            state.total = payload.payload.total
            state.documents = payload.payload.documents
         })
         .addCase(getMainnetProposals.rejected, (state) => {
            state.state = "failed"
         })
         .addCase(getTestnetProposals.pending, (state) => {
            state.state = "loading"
         })
         .addCase(getTestnetProposals.fulfilled, (state, payload) => {
            state.state = "done"
            state.total = payload.payload.total
            state.documents = payload.payload.documents
         })
         .addCase(getTestnetProposals.rejected, (state) => {
            state.state = "failed"
         })
   },
})

export const getMainnetProposals = createAsyncThunk(
   "proposals/get/mainnet",
   async () => await databases.listDocuments(databaseId, proposalCollection, [Query.equal("chain", "mainnet")]),
)

export const getTestnetProposals = createAsyncThunk(
   "proposals/get/testnet",
   async () => await databases.listDocuments(databaseId, proposalCollection, [Query.equal("chain", "testnet")]),
)

export const { filterProposals } = proposalSlice.actions
export default proposalSlice.reducer
