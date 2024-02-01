import { userSession } from "../utils/authenticate"
import { truncateAddress } from "../utils/truncateAddress"

export default function useUserAdress(chain: string) {
   if (!userSession.isUserSignedIn()) return
   const testnetAddress = userSession.loadUserData().profile.stxAddress.testnet
   const mainnetAddress = userSession.loadUserData().profile.stxAddress.mainnet

   return chain === "mainnet" ? truncateAddress(mainnetAddress) : truncateAddress(testnetAddress)
}
