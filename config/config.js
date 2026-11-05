require('dotenv').config();


const user = process.env.DBUSERNAME;
const password = process.env.DBPASSWORD;
const db = process.env.DBNAME;
const host = process.env.DBHOST;
const port = process.env.DBPORT;

module.exports = {
  "development": {
    "username": "root",
    "password": "root",
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": user,
    "password": password,
    "database": db,
    "host": host,
    "dialect": "mysql",
    port: port
  }
}
