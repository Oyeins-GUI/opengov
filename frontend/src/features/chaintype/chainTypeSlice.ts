import { createSlice } from "@reduxjs/toolkit"

type ChainType = {
   chain: "mainnet" | "testnet" | "devnet"
}

const initialState: ChainType = {
   chain: "testnet",
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
