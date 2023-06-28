import App from "./app"
import { initialize } from "./config/dbConnect"

const PORT = process.env.PORT ?? 3500

const app = new App(PORT as number)


const initServer = async () => {
  app.listen()
  await initialize()
}

initServer()