import type { NextFunction, Request, Response } from 'express'
import express from 'express'
import Controller from '../interfaces/controller.interface'
import DogService from '../services/dog.service'
import validationMiddleware from '../middleware/validationMiddleware'
import DogDTO from '../models/dog.dto'

class DogController implements Controller {
  public path = '/dogs'
  public router = express.Router()
  public dogService = new DogService()

  constructor () {
    this.initRoutes()
  }

  public initRoutes (): void {
    this.router.get(`${this.path}/`, this.getAllDogsHandler)
    this.router.post(`/dog/`, validationMiddleware(DogDTO), this.createDogHandler)
  }

  private readonly getAllDogsHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const allDogs = await this.dogService.getAllDogs()
    res.status(200).json(allDogs)
    next()
  }

  private readonly createDogHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const dogData = req.body
    try {
      const createdDog = await this.dogService.createDog(dogData)
      res.status(201).json(createdDog)
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default DogController