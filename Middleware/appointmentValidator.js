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
    .pattern(DATE_PATTERN)
    .custom(futureDate)
    .required()
    .messages({
      'any.required': 'Appointment date is required',
      'string.empty': 'Appointment date must not be empty',
      'string.pattern.base': 'Appointment date must be in YYYY-MM-DD format, for example 2026-11-10',
    }),
 
  AppointmentTime: Joi.string().pattern(TIME_PATTERN).required().messages({
    'any.required': 'Appointment time is required',
    'string.empty': 'Appointment time must not be empty',
    'string.pattern.base': 'Appointment time must be 24-hour HH:mm, for example 09:21 or 14:30',
  }),
 
  status: Joi.string().valid(...STATUSES).optional().messages({
    'any.only': `Status must be one of: ${STATUSES.join(', ')}`,
  }),
 
  reason: Joi.string().trim().min(3).max(255).required().messages({
    'any.required': 'Reason is required',
    'string.empty': 'Reason must not be empty',
    'string.min': 'Reason must be at least 3 characters',
    'string.max': 'Reason cannot be more than 255 characters',
  }),
});
  

const { error } = schema.validate(req.body);
 
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
 
  next();

}

const updateAppointmentValidator = (req, res, next)=> {
    const updateSchema = Joi.object({
  AppointmentDate: Joi.string().pattern(DATE_PATTERN).custom(futureDate).messages({
    'string.pattern.base': 'Appointment date must be in YYYY-MM-DD format, for example 2026-11-10',
  }),
  AppointmentTime: Joi.string().pattern(TIME_PATTERN).messages({
    'string.pattern.base': 'Appointment time must be 24-hour HH:mm, for example 09:21 or 14:30',
  }),
  status: Joi.string().valid(...STATUSES).messages({
    'any.only': `Status must be one of: ${STATUSES.join(', ')}`,
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