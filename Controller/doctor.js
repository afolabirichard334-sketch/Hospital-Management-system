const { Doctor, Department } = require('../models');


const createDoctor = async (req, res) => {
    try{
      const {firstName, lastName, email, phoneNumber, specialization, qualification, experience, departmentId} = req.body;
     const doctor = await Doctor.findOne({where: {email}});
     if (doctor) {
      return  res.status(400).json({
            message: 'Doctor already exists'
        })
     } 

     const newDoctor = await Doctor.create({
        firstName,
        lastName,
        email,
        phoneNumber,
        specialization,
        qualification,
        experience,
        departmentId
     });

     res.status(201).json({
        message: 'Doctor created successfully',
        data: newDoctor
     })

    } catch(error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAllDoctors = async (req, res) => {
    try {
       const doctors  = await Doctor.findAll({
        include:[{
            model: Department,
            as: 'department'
        }]
       }) 

       res.status(200).json ({
     messsage: `All Doctors in the database are ${Doctor.length}`,
     data: doctors

       })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const getOneDoctor = async (req, res) => {
    try {
        const { id } = req.params
        const doctor = await Doctor.findByPk(id, {
            include: [{
                model: Department,
                as: 'department'
            }]
        })

        if(!doctor) {
           return res.status(400).json ({
                message:`Doctor not found`
            })
        }
        res.status(200).json({
            message: "Doctor found successfully",
            data:doctor
        })
    } catch (error) {
     res.status(500).json({
        error:error.message
     })   
     }
}



const updateDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);
        if(!doctor) {
           return res.status(400).json ({
                message:`Doctor not found`
            })
        }
    if (req.body.departmentId) {
        const department = await Department.findByPk(req.body.departmentId);
        
        if (!department) {
           return  res.status(404).json ({
            message: 'Department not found'
           })
        }
    }
        await doctor.update(req.body)

        res.status(200).json({
            message: 'Doctor updated successfully',
            data:doctor
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const deleteDoctor = async (req, res) => {
    try {
        const doctor = await Doctor.findByPk(req.params.id);

        if(!doctor) {
            res.status(400).json ({
                message:`Doctor not found`
            })
        } 

        await doctor.destroy()

        res.status(200).json({
            message: 'Doctor deleted successfully',
            data: doctor
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports = {
    createDoctor,
    getAllDoctors,
    getOneDoctor,
    updateDoctor,
    deleteDoctor 
}