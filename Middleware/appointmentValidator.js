const Joi = require('joi');


const appointmentValidation = (req,res, next)=> {
   const Schema = Joi.object({
  patientId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'patientId is required',
    'string.empty': 'patientId must not be empty',
    'string.guid': 'patientId must be a valid UUID',
  }),
 
  doctorId: Joi.string().guid({ version: 'uuidv4' }).required().messages({
    'any.required': 'doctorId is required',
    'string.empty': 'doctorId must not be empty',
    'string.guid': 'doctorId must be a valid UUID',
  }),
 
  AppointmentDate: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      'any.required': 'Appointment date is required',
      'string.empty': 'Appointment date must not be empty',
      'string.pattern.base': 'Appointment date must be in YYYY-MM-DD format, for example 2026-11-10',
    }),
 
  AppointmentTime: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).required().messages({
    'any.required': 'Appointment time is required',
    'string.empty': 'Appointment time must not be empty',
    'string.pattern.base': 'Appointment time must be 24-hour HH:mm, for example 09:21 or 14:30',
  }),
 
  status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').optional().messages({
    'any.only': "Status must be one of these: 'pending', 'confirmed', 'completed', 'cancelled'"
  }),
 
  reason: Joi.string().trim().min(3).max(255).required().messages({
    'any.required': 'Reason is required',
    'string.empty': 'Reason must not be empty',
    'string.min': 'Reason must be at least 3 characters',
    'string.max': 'Reason cannot be more than 255 characters',
  }),
});
  

const { error } = Schema.validate(req.body);
 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
 
  next();

}

const updateAppointmentValidator = (req, res, next)=> {
    const updateSchema = Joi.object({
  AppointmentDate: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).messages({
    'string.pattern.base': 'Appointment date must be in YYYY-MM-DD format, for example 2026-11-10',
  }),
  AppointmentTime: Joi.string().pattern(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/).messages({
    'string.pattern.base': 'Appointment time must be 24-hour HH:mm, for example 09:21 or 14:30',
  }),
  status: Joi.string().valid().messages({
    'any.only': `Status must be one of these: 'pendin', 'confirmed', 'completed','cancelled'`
  }),
  reason: Joi.string().trim().min(3).max(255).messages({
    'string.min': 'Reason must be at least 3 characters',
    'string.max': 'Reason cannot be more than 255 characters',
  }),
})
  .min(1)
  .messages({ 'object.min': 'Provide at least one field to update' });
}


module.exports = {
    appointmentValidation,
    updateAppointmentValidator
}