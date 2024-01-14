import { configureStore } from "@reduxjs/toolkit"
import chainTypeReducer from "../features/chaintype/chainTypeSlice"

export const store = configureStore({
   reducer: {
      chain: chainTypeReducer,
   },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
