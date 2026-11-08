const {Appointment, Patient, Doctor} = require('../models')

const createAppointment = async (req, res) => {
    try{
        const {id} = req.params;
       const {patientId,doctorId,AppointmentTime,AppointmentDate,status,reason} = req.body;

       const findpatient = await Patient.findByPk(patientId)

       if(!findpatient) {
        return res.status(404).json({
            message:'Patient not found'
        })
    }
     const findDoctor = await Doctor.findByPk(doctorId)

       if(!findDoctor) {
        return res.status(404).json({
            message:'Doctor not found',
        })
  }


  const findAppointment = await Appointment.findByPk(id)

  const newAppointment = await Appointment.create({patientId,doctorId,AppointmentTime,AppointmentDate,status,reason})

  res.status(201).json({
    message: 'Appointment created successfully',
    data: newAppointment
  })
} catch(err) {
  return res.status(500).json({
    message: err.message
  })
}
}

const getAllAppointments = async (req, res)=> {
 try {
    const appointments = await Appointment.findAll()

    res.status(200).json({
        message: 'Appointments found',
        data: appointments
    })
 } catch (err) {
    return res.status(500).json({
        message:err.message
    })
 }
}

const getAppointmentByPk = async (req, res)=> {
    try{
    const {id} = req.params;
    const findAppointment = await Appointment.findByPk(id, {
        attributes: ['id', 'AppointmentDate', 'AppointmentTime','status','reason'],
        include: [
        {
            model:Doctor,
            as:'Doctors',
            attributes: ['id', 'firstName', 'lastName', 'specialization'],
        },        
        {
          model: Patient,
          as: 'Patients',
          attributes: ['id', 'firstName', 'lastName'],
        },  
    ]
    })
    if (!findAppointment) {
        return res.status(404).json({message:'Appointment not found'})
    }

    return res.status(200).json({
        message: 'Appointment found successfully',
        data:findAppointment
    })
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
}

const updateAppointment = async(req, res)=> {
try {
        const {id} = req.params
    const {AppointmentDate,AppointmentTime,status,reason} = req.body;

    const appointment = await Appointment.findByPk(id)

    if(!appointment) {
        return res.status(404).json({
            message: 'Appointment record not found'
        })
    }

    const update = await appointment.update({AppointmentDate,AppointmentTime,status,reason})

    res.status(200).json({
        message: 'Appointment updated successfully',
        data: update
    })
} catch (err) {
    return res.status(500).json({
        message: err.message
    })
}
}

module.exports = {
    createAppointment,
    getAllAppointments,
    getAppointmentByPk,
    updateAppointment
}