import App from "./app"
import { db } from "./config/dbConnect"

const PORT = process.env.PORT ?? 3500

const app = new App(PORT as number)


const initServer = async () => {
  app.listen()
  const example = {
    "name": "Neo",
    "color": "red&amber",
    "tail_length": 22,
    "weight": 32
  }
  const neo = await db.dog?.create(example)
  console.log('NEO: ', neo)
}

initServer()