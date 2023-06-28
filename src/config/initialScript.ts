import initialData from './initialData'
import Dog from '../models/Dog'


const addInitialData = async () => {
  if (await isAlreadyExists()) return
  initialData.map((async element => {
    await Dog.create(element)
  }))
}

const isAlreadyExists = async () => {
  const dog = await Dog.findOne({ where: { name: 'Neo' } })
  return dog
}

export default addInitialData