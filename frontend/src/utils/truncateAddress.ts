export const truncateAddress = (address: string) => {
   const charsInAddress = address.split("")
   charsInAddress.splice(4, 33, "...")

   return charsInAddress.join("")
}
