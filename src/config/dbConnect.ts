import { Connection, Request } from 'tedious'
import dbOptions from './dbConfig'
import addInitialData from './initialScript'
import sequelize from './Sequelize'
import NewDog from '../models/Dog'
import HttpException from '../exeptions/HttpException'

const { dbName, dbConfig } = dbOptions

export async function initialize () {
  await ensureDbExists(dbName)
  await NewDog.sync({ alter: true })
  await sequelize.sync({ alter: true })
  await addInitialData()
}

function ensureDbExists (dbName: string): Promise<void> {
  const query = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
  const connection = new Connection(dbConfig)
  const request = new Request(query, err => {
    if (err) throw new HttpException(500, err.message)
  })
  return new Promise((resolve, reject) => {
    connection.connect(err => {
      if (err) reject(new HttpException(500, err.message))
      connection.execSql(request)
    })
    resolve()
  })

}

