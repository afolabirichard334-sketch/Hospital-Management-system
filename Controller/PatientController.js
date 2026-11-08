const { Patient } = require("../models");

const createPatient = async (req, res) => {
    try {
        
        const { firstName, lastName, email, dateOfBirth, gender, bloodType, height, weight, chronic_condition, allergies } = req.body;
          
        const find = await Patient.findOne({ where: { email } });

        if (find) {
            return res.status(409).json({
                message: `User with email: ${email} already exist`
            });
        }

        
        const patient = await Patient.create({ firstName, lastName, email, dateOfBirth, gender, bloodType, height, weight, chronic_condition, allergies });

       
        return res.status(201).json({
            message: "Patient created successfully", 
            data: patient
        });

    } catch (error) {
        
        return res.status(500).json({
            error: error.message
        });
    }
};

const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll();

        return res.status(200).json({
            message: `We have ${patients.length} numbers of patients in the database`, 
            data: patients
        });
        
    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const getOnePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id);

        if (!patient) {
            return res.status(404).json({
                message: "Patient records not found"
            });
        }

        return res.status(200).json({
            message: "Patient records retrived", 
            data: patient
        });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const updateOnePatient = async (req, res) => {
    try {
        const { id } = req.params;
       
        const { firstName, lastName, email, dateOfBirth, gender, bloodType, height, weight, chronic_condition, allergies } = req.body;
        const findPatient = await Patient.findByPk(id);

        if (!findPatient) {
            return res.status(404).json({ message: "Patient records not found" });
        }

        const updatedPatient = await findPatient.update({ firstName, lastName, email, dateOfBirth, bloodType, gender, height, weight, chronic_condition, allergies });
        
        return res.status(200).json({ message: "Patient records updated successfully", data: updatedPatient });

    } catch (error) {
        return res.status(500).json({
            error: error.message
        });
    }
};

const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleteOne = await Patient.destroy({ where: { id } });

        if (!deleteOne) {
            return res.status(404).json({
                message: "Patient record not found"
            });
        }

        return res.status(200).json({
            message: "Patient record deleted successfully", 
            data: deleteOne
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createPatient,
    getAllPatients,
    getOnePatient,  
    updateOnePatient,
    deletePatient
    
};
