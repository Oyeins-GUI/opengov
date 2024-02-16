import { userSession } from "./authenticate"

export const truncateAddress = (address: string) => {
   if (!userSession.isUserSignedIn()) return

   const charsInAddress = address.split("")
   charsInAddress.splice(4, 33, "...")

   return charsInAddress.join("")
}
