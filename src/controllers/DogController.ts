import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import Controller from '../interfaces/controller.interface'
import Dog from '../models/Dog'

class DogController implements Controller {
  public path = '/dogs'
  public router = express.Router()

  constructor () {
    this.initRoutes()
  }

  public initRoutes (): void {
    this.router.get(`${this.path}/`, this.getAllDogs)
  }

  private readonly getAllDogs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allDogs = await Dog.findAll()
    res.status(200).json(allDogs)
  }
}

export default DogController