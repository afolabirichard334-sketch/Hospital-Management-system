const express = require('express');

const router = express.Router();
const {createDoctor, getAllDoctors, getOneDoctor, updateDoctor, deleteDoctor} = require('../Controller/doctor');

const { createDoctorValidation, updateDoctorValidation } = require('../Middleware/doctorValidator');

router.post('/newDoctor',createDoctorValidation, createDoctor);

router.get('/getAllDoctors', getAllDoctors);

router.get('/getOneDoctor/:id', getOneDoctor);

router.patch('/updateDoctor/:id',  updateDoctorValidation, updateDoctor );

router.delete('/deleteDoctor/:id', deleteDoctor);


module.exports = router