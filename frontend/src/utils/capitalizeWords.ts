export default function capitalize(str: string) {
   const newStr = str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1))

   return newStr.join(" ")
}
