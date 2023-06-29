import initialData from './initialData'
import Dog, { DogOuput } from '../models/Dog'

const addInitialData = async (): Promise<void> => {
  if (await isAlreadyExists()) return
  initialData.map(async element => await Dog.create(element))
}

const isAlreadyExists = async (): Promise<DogOuput | null> => await Dog.findOne({ where: { name: 'Neo' } })

export default addInitialData