const { Department, Doctor } = require('../models');

const createDepartment = async (req, res) => {
    try {
       const {name, description, location, phoneNumber, email} = req.body;
        const department = await Department.findOne({where: {email}})
        if(department) {
            return res.status(400).json({
                message: 'Department exists'
            })
        }
 
        const newDepartment = await Department.create({
            name,
            description,
            location, 
            phoneNumber,
            email
        })

        res.status(201).json({
            message:'Department created successfully',
            data: newDepartment
        })
        
    } catch (error) {
      res.status(500).json({
        error: error.message
      })  
    }
}


const getAllDepartments = async (req, res) => {
    try {
       const department  = await Department.findAll() 

       res.status(200).json ({
     messsage: `All department in the database are ${Department.length}`,
     data: department
       })
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}


const getOneDepartment = async (req, res) => {
    try {
        const { id } = req.params
        const department = await Department.findByPk(id);

        if(!department) {
           return res.status(400).json ({
                message:`Department not found`
            })
        }
        res.status(200).json({
            message: "Department found successfully",
            data:department
        })
    } catch (error) {
     res.status(500).json({
        error:error.message
     })   
     }
}

const updateDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);
        if(!department) {
          return  res.status(400).json ({
                message:`Department not found`
            })
        }

        await department.update(req.body)
        res.status(200).json({
            message: 'Department updated successfully',
            data:department
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

const deleteDepartment = async (req, res) => {
    try {
        const department = await Department.findByPk(req.params.id);

        if(!department) {
           return res.status(400).json ({
                message:`Department not found`
            })
        } 

        await department.destroy()

        res.status(200).json({
            message: 'Department deleted successfully',
            data: department
        })
    } catch (error) {
        res.status(500).json({
            error:error.message
        })
    }
}

module.exports = {
    createDepartment,
    getAllDepartments,
    getOneDepartment,
    updateDepartment,
    deleteDepartment 
}