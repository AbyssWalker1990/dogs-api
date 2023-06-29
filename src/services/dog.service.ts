import { Request } from "express"
import HttpException from "../exeptions/HttpException"
import Dog from "../models/Dog"
import { DogOuput, DogInput } from "../models/Dog"
import { Attribute, Order, DogsParams } from "../interfaces/dog.service.interface"


class DogService {
  public createDog = async (dogData: DogInput): Promise<DogOuput | undefined> => {
    console.log('trigger service create')
    try {
      const createdDog = await Dog.create(dogData)
      return createdDog
    } catch (error: any) {
      console.log(JSON.stringify(error, null, 2))
      if (error.name === 'SequelizeUniqueConstraintError') throw new HttpException(409, 'Name of Dog must be unique!')
      throw new HttpException(400, error.message)
    }
  }

  public getDogs = async (req: Request): Promise<DogOuput[]> => {
    const params: DogsParams = {
      page: Number(req.query.page) ?? 1,
      pageSize: Number(req.query.pageSize) ?? 10,
      attribute: req.query.attribute as Attribute ?? Attribute.createdAt,
      order: req.query.order as Order ?? Order.desc
    }

    const sortedDogs = await this.sortAndPaginate(params)
    return sortedDogs
  }

  private sortAndPaginate = async (params: DogsParams): Promise<DogOuput[]> => {
    const { page, pageSize, attribute, order } = params
    const limit = pageSize
    const offset = (page - 1) * pageSize

    const dogs = await Dog.findAll({
      limit,
      offset,
      order: [[attribute, order]],
      where: {}
    })
    return dogs
  }
}

export default DogService