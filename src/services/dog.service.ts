import HttpException from "../exeptions/HttpException"
import Dog from "../models/Dog"
import { DogOuput, DogInput } from "../models/Dog"

class DogService {
  public getAllDogs = async (): Promise<DogOuput[]> => {
    return await Dog.findAll()
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