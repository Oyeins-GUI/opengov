import { userSession } from "@/utils/authenticate"

export default function useUserAdress(chain: string) {
   if (!userSession.isUserSignedIn()) return
   const testnetAddress = userSession.loadUserData().profile.stxAddress.testnet
   const mainnetAddress = userSession.loadUserData().profile.stxAddress.mainnet

   return chain === "mainnet" ? mainnetAddress : testnetAddress
}
