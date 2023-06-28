import express from 'express'
import Controller from './interfaces/controller.interface'

class App {
  public app: express.Application
  public port: number

  constructor (controllers: Controller[], port: number) {
    this.app = express()
    this.port = port

    this.initMiddlewares()
    this.initControllers(controllers)
    this.app.get('/', (req, res) => {
      res.send('Hello World')
    })
  }

  private initControllers (controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
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
