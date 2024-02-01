import ReactDOM from "react-dom/client"
import App from "./App.tsx"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store"
import { Connect } from "@stacks/connect-react"
import { userSession } from "./utils/authenticate.ts"
import logo from "./assets/opengov-logo2.png"

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider store={store}>
      <Connect
         authOptions={{
            appDetails: {
               name: "Open Gov",
               icon: logo,
            },
            redirectTo: "/",
            onFinish: () => {
               window.location.reload()
            },
            userSession,
         }}
      >
         <App />
      </Connect>
   </Provider>,
)
