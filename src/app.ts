import express from 'express'
import type { Response, Request, NextFunction } from 'express'
import Controller from './interfaces/controller.interface'
import cors from 'cors'
import corsOptions from './config/corsOptions'
import errorMiddleware from './middleware/errorMiddleware'
import timeout from 'connect-timeout'

class App {
  public app: express.Application
  public port: number

  constructor (controllers: Controller[], port: number) {
    this.app = express()
    this.port = port

    this.initMiddlewares()
    this.initControllers(controllers)
    this.initErrorMiddleware()
  }

  private initControllers (controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router)
    })
  }

  private initMiddlewares (): void {

    this.app.use(timeout('8s'))
    this.app.use(cors(corsOptions))
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(express.json())
    this.app.use(this.haltOnTimedout)
  }

  private initErrorMiddleware (): void {
    this.app.use(errorMiddleware)
  }

  private haltOnTimedout (req: Request, res: Response, next: NextFunction) {
    if (!req.timedout) next()
  }

  public listen (): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port: ${this.port}`)
    })
  }
}

export default App
