const {Sequelize} = require('sequelize');

const user = process.env.DBUSERNAME
const password = process.env.DBPASSWORD
const db = process.env.DBNAME   
const host = process.env.DBHOST
const port = process.env.DBPORT

const sequelize = new Sequelize(db, user,
    password,{
        host:host,
        dialect:'mysql',
        port:port
    })


module.exports = sequelize