import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Proposal from "./components/Proposal/index.tsx"
import ErrorPage from "./components/ErrorPage/error.tsx"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
   {
      path: "/proposal/:id",
      element: <Proposal />,
      errorElement: <ErrorPage />,
   },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
   <QueryClientProvider client={queryClient}>
      <Provider store={store}>
         <RouterProvider router={router} />
      </Provider>
   </QueryClientProvider>,
)
