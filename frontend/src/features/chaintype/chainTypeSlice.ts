import { createSlice } from "@reduxjs/toolkit"

interface ChainType {
   chain: string
}

const initialState: ChainType = {
   chain: "mainnet",
}

export const chainTypeSlice = createSlice({
   name: "chain",
   initialState,
   reducers: {
      changeToMainnet(state) {
         state.chain = "mainnet"
      },
      changeToTestnet(state) {
         state.chain = "testnet"
      },
   },
})

export const { changeToMainnet, changeToTestnet } = chainTypeSlice.actions
export default chainTypeSlice.reducer
