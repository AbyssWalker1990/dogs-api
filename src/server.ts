import App from "./app"
import { initialize } from "./config/dbConnect"
import DogController from "./controllers/DogController"

const PORT = process.env.PORT ?? 3500

const app = new App(
  [new DogController()],
  PORT as number
)


const initServer = async () => {
  app.listen()
  await initialize()
}

initServer()