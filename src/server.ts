import App from "./app"
import { db } from "./config/dbConnect"

const PORT = process.env.PORT ?? 3500

const app = new App(PORT as number)

app.listen()

const example = {
  "name": "Neo",
  "color": "red&amber",
  "tail_length": 22,
  "weight": 32
}
db.dog?.create(example)