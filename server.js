const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 2026;
const sequelize = require('./database/database');



const app = express();
app.use = (express.json())


const DBConnection = async() =>{
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully')
    } catch (error) {
        console.log('failed to connect to Database', error.message)
    }
}
 
DBConnection();


app.listen(PORT, () =>{
    console.log(`server is Running on PORT ${PORT}`)
})

