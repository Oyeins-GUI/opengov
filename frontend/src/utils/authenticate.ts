import { AppConfig, UserSession, showConnect } from "@stacks/connect"
import logo from "../assets/opengov-logo2.png"
import { Storage } from "@stacks/storage"

const appConfig = new AppConfig(["store_write", "publish_data"])
export const userSession = new UserSession({ appConfig })

if (userSession.isUserSignedIn()) {
   const privateKey = userSession.loadUserData().appPrivateKey
   const userAppData = userSession.store.getSessionData().userData
   userSession.store.getSessionData().userData = {
      appPrivateKey: privateKey,
      ...userAppData,
   }
}

export const storage = new Storage({ userSession })

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
