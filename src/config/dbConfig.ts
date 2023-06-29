import dotenv from 'dotenv'
dotenv.config()

const dbName = process.env.DB_NAME
const userName = process.env.DB_USER
const password = process.env.DB_PASSWORD

const dbOptions = {
  dbName: dbName as string,
  dbConfig: {
    server: "mssql",
    options: {
      port: 1433,
      trustServerCertificate: true
    },
    authentication: {
      type: "default",
      options: {
        userName: userName as string,
        password: password as string
      }
    }
  }
}

export default dbOptions