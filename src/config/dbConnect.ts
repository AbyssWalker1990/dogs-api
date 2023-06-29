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

async function ensureDbExists (dbName: string): Promise<void> {
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

// async function ensureDbExists (dbName: string): Promise<void> {
//   return new Promise((resolve, reject) => {
//     const connection = new Connection(dbConfig);
//     connection.connect((err) => {
//       if (err) {
//         console.error(err);
//         reject(`Connection Failed: ${err.message}`);
//       }

//       const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
//       const request = new Request(createDbQuery, (err) => {
//         if (err) {
//           console.error(err);
//           reject(`Create DB Query Failed: ${err.message}`);
//         }

//         // query executed successfully
//         resolve()
//       });

//       connection.execSql(request);
//     });
//   });
// }