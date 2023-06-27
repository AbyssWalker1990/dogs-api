import express from 'express'

class App {
  public app: express.Application
  public port: number

  constructor (port: number) {
    this.app = express()
    this.port = port

    this.initMiddlewares()
    this.app.get('/', (req, res) => {
      res.send('Hello World')
    })
  }

  private initMiddlewares (): void {
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port: ${this.port}`)
    })
  }
}

export default App
