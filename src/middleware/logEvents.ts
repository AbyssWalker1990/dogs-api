import { format } from 'date-fns'
import { v4 as uuidv4 } from 'uuid'
import fs, { promises as fsPromises } from 'fs'
import path from 'path'

export const logEvents = async (message: string, logName: string): Promise<void> => {
  const dateTime = `${format(new Date(), 'dd-MM-yyyy  kk:mm:ss')}`
  const logItem = `${dateTime}  ${uuidv4()}  ${message}\n`
  const pathToLogDir = path.join(__dirname, '..', '..', 'logs')

  try {
    if (!fs.existsSync(pathToLogDir)) {
      await fsPromises.mkdir(pathToLogDir)
    }
    await fsPromises.appendFile(path.join(pathToLogDir, logName), logItem)
  } catch (err) {
    console.log(err)
  }
}
