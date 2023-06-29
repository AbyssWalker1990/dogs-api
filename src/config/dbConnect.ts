import { Connection, Request } from 'tedious'
import dbOptions from './dbConfig'
import addInitialData from './initialScript'
import sequelize from './Sequelize'
import NewDog from '../models/Dog'
import HttpException from '../exeptions/HttpException'

const { dbName, dbConfig } = dbOptions

export async function initialize () {
  ensureDbExists(dbName)
  await NewDog.sync({ alter: true })
  await sequelize.sync({ alter: true })
  await addInitialData()
}

function ensureDbExists (dbName: string): void {
  const query = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
  const connection = new Connection(dbConfig)
  const request = new Request(query, err => {
    if (err) throw new HttpException(500, err.message)
  })
  connection.connect(err => {
    if (err) throw new HttpException(500, err.message)
    connection.execSql(request)
  })
}