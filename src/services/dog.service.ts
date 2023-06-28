import Dog from "../models/Dog"
import { DogOuput, DogInput } from "../models/Dog"

class DogService {
  public getAllDogs = async (): Promise<DogOuput[]> => {
    return await Dog.findAll()
  }

  public createDog = async (dogData: DogInput): Promise<DogOuput> => {
    console.log('trigger service create')
    const createdDog = await Dog.create(dogData)
    return createdDog
  }
}

export default DogService