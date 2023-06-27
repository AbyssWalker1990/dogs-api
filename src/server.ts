import App from "./app"

const PORT = process.env.PORT ?? 3500

const app = new App(PORT as number)

app.listen()