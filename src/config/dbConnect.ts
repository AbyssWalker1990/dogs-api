import tedious, { Connection, Request } from 'tedious'
import { Model, ModelStatic, Sequelize } from 'sequelize'
import dbOptions from './dbConfig'
import { dog } from '../models/dog'

const { dbName, dbConfig } = dbOptions

interface MyDb {
  dog?: ModelStatic<Model<any, any>>
}

export const db: MyDb = {}

initialize()

async function initialize () {
  console.log('triggered')
  const dialect = 'mssql';
  const host = dbConfig.server;
  const { userName, password } = dbConfig.authentication.options;

  // create db if it doesn't already exist
  await ensureDbExists(dbName);

  // connect to db
  const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

  // init models and add them to the exported db object
  db.dog = dog(sequelize)

  // sync all models with database
  await sequelize.sync({ alter: true });
  const example = {
    "name": "Neo",
    "color": "red&amber",
    "tail_length": 22,
    "weight": 32
  }
  const neo = await db.dog?.create(example)
  console.log('NEO: ', neo)
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

        // query executed successfully
        resolve();
      });

      connection.execSql(request);
    });
  });
}