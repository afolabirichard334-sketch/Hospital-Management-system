const express = require ("express");
const router = express.Router();


const { createPatient,getAllPatients,getOnePatient,  updateOnePatient, deletePatient} = require('../Controller/PatientController.js');
const {patientValidation, patientUpdateValidation} = require ('../Middleware/patientValidator.js');



router.post('/newPatient',patientValidation, createPatient);

router.get('/getAllPatients', getAllPatients);

router.get('/getOnePatient/:id', getOnePatient);

router.put('/updatePatient/:id',  patientUpdateValidation, updateOnePatient);

router.delete('/deletePatient/:id', deletePatient);


module.exports = router;