const express = require ("express");
const router = express.Router();


const { createAppointment,getAllAppointments,getAppointmentByPk,updateAppointment } = require('../Controller/appointmentControlller')
const {appointmentValidation, updateAppointmentValidator} = require('../Middleware/appointmentValidator')




router.post('/newappointment',appointmentValidation, createAppointment);
router.put('/updateappointment/:id', updateAppointment)
router.get('/appointments', getAllAppointments)
router.get('/oneappointment/:id', getAppointmentByPk)


module.exports = router;