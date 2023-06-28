import { Request } from "express"
import HttpException from "../exeptions/HttpException"
import Dog from "../models/Dog"
import { DogOuput, DogInput } from "../models/Dog"

class DogService {
  public getAllDogs = async (req: Request): Promise<DogOuput[]> => {
    const page = req.query.page ?? 1
    const pageSize = req.query.pageSize ?? 10
    console.log('page: ', page)
    console.log('pageSize: ', pageSize)
    const result = await this.handler(Number(page), Number(pageSize))
    console.log(result)
    return result
  }

  private handler = async (page: number, pageSize: number): Promise<DogOuput[]> => {
    const offset = (page - 1) * pageSize
    const limit = pageSize
    const dogs = await Dog.findAll({
      limit,
      offset,
      order: [['tail_length', 'DESC']],
      where: {}
    })
    console.log('DOGS: ', dogs)
    return dogs
  }

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
}

export default DogService