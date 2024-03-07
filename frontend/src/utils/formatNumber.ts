export default function formatNumber(number: string, style?: string) {
   if (style === "comma") return new Intl.NumberFormat().format(+number)

   return new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(+number)
}
