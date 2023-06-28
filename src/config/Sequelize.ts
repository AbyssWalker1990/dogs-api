import dbOptions from './dbConfig'
import { Sequelize } from 'sequelize'


const { dbName, dbConfig } = dbOptions
const dialect = 'mssql';
const host = dbConfig.server;
const { userName, password } = dbConfig.authentication.options;

const sequelize = new Sequelize(dbName, userName, password, { host, dialect });

export default sequelize
