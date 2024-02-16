type TimeInMs = {
   year: number
   month: number
   day: number
   hour: number
   minute: number
   second: number
}

const units: TimeInMs = {
   year: 24 * 60 * 60 * 1000 * 365,
   month: (24 * 60 * 60 * 1000 * 365) / 12,
   day: 24 * 60 * 60 * 1000,
   hour: 60 * 60 * 1000,
   minute: 60 * 1000,
   second: 1000,
}

const rtf = new Intl.RelativeTimeFormat("en", { style: "narrow" })

export const getRelativeTime = (timestamp: number, now: Date = new Date()) => {
   const elapsed = timestamp - +now

   for (const u in units) {
      if (Math.abs(elapsed) > units[u as keyof TimeInMs] || u == "second") {
         return rtf.format(Math.round(elapsed / units[u as keyof TimeInMs]), u as keyof TimeInMs)
      }
   }
}
