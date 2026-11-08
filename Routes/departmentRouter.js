const express = require('express');

const router = express.Router();
const {createDepartment, getAllDepartments, getOneDepartment, updateDepartment, deleteDepartment} = require('../Controller/department');


const { createDepartmentValidation, updateDepartmentValidation } = require('../Middleware/departmentValidator');


router.post('/newDepartment', createDepartmentValidation, createDepartment);

router.get('/getAllDepartments', getAllDepartments);

router.get('/getOneDepartment/:id', getOneDepartment);

router.patch('/updateDepartment/:id', updateDepartmentValidation, updateDepartment );

router.delete('/deleteDepartment/:id', deleteDepartment);


module.exports = router