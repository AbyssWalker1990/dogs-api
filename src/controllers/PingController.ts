import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import Controller from '../interfaces/controller.interface'


class PingController implements Controller {
  public path = '/ping'
  public router = express.Router()

  constructor () {
    this.initRoutes()
  }

  public initRoutes (): void {
    this.router.get(`${this.path}/`, this.pingHandle)
  }

  public pingHandle = (req: Request, res: Response, next: NextFunction): void => {
    res.send('Dogshouseservice.Version1.0.1')
  }
}

export default PingController