import { AppConfig, UserSession, showConnect } from "@stacks/connect"
import logo from "../assets/opengov-logo2.png"

const appConfig = new AppConfig(["store_write", "publish_data"])
export const userSession = new UserSession({ appConfig })

export function authenticate() {
   showConnect({
      appDetails: {
         name: "Open Gov",
         icon: logo,
      },
      redirectTo: "/",
      onFinish: () => {
         window.location.reload()
      },
      userSession,
   })
}

export function disconnect() {
   userSession.signUserOut("/")
}
