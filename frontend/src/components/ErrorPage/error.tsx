import { useRouteError } from "react-router-dom"

type NotFoundError = {
   data: string
   error: {
      message: string
      stack: string
   }
   internal: boolean
   status: number
   statusText: string
}

export default function ErrorPage() {
   const error = useRouteError() as NotFoundError
   console.error(error.error)

   return (
      <div id="error-page">
         <h1>Oops!</h1>
         <p>Sorry, an unexpected error has occurred.</p>
         <p>
            <i>{error?.statusText}</i>
         </p>
      </div>
   )
}
