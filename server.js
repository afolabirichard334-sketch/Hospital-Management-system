const express = require('express');
require('dotenv').config();
const PORT = process.env.PORT || 2026;
const sequelize = require('./database/database');

const departmentRouter = require('./Routes/departmentRouter')
const doctorRouter = require('./Routes/doctorRouter')
const patientRouter = require('./Routes/patientRoutes')

const app = express();

app.use(express.json());

app.use(departmentRouter);
app.use(doctorRouter);
app.use(patientRouter);


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

