export const truncateAddress = (address: string) => {
   let charsInAddress = address.split("")
   charsInAddress.splice(4, 33, "...")

   return charsInAddress.join("")
}
