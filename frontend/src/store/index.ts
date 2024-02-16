import { configureStore } from "@reduxjs/toolkit"
import chainTypeReducer from "@/features/chaintype/chainTypeSlice"
import proposalReducer from "@/features/proposals/proposalSlice"

export const store = configureStore({
   reducer: {
      chain: chainTypeReducer,
      proposal: proposalReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
