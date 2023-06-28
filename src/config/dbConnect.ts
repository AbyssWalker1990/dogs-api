import { Connection, Request } from 'tedious'
import dbOptions from './dbConfig'
import addInitialData from './initialScript'
import sequelize from './Sequelize'
import NewDog from '../models/Dog'

const { dbName, dbConfig } = dbOptions

export async function initialize () {

  // create db if it doesn't already exist
  await ensureDbExists(dbName);

  // connect to db
  // const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

  // sync all models with database
  await NewDog.sync({ alter: true })
  await sequelize.sync({ alter: true });
  await addInitialData()
  return sequelize
}

async function ensureDbExists (dbName: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const connection = new Connection(dbConfig)
    connection.connect((err) => {
      if (err) {
        console.error(err);
        reject(`Connection Failed: ${err.message}`);
      }

      const createDbQuery = `IF NOT EXISTS(SELECT * FROM sys.databases WHERE name = '${dbName}') CREATE DATABASE [${dbName}];`;
      const request = new Request(createDbQuery, (err) => {
        if (err) {
          console.error(err);
          reject(`Create DB Query Failed: ${err.message}`);
        }

        // query executed successfull
        resolve();
      });

      connection.execSql(request);
    });
  });
}