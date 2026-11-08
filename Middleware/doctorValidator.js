const Joi = require("joi");
const department = require("../models/department");

const createDoctorValidation = (req, res, next) => {
const schema = Joi.object({
firstName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).required().messages({
      "any.required": "First name is required.",
      "string.empty": "First name cannot be empty",
      "string.pattern.base": "First name must be letters only, and must be at least 3 characters."
    }),
    lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).required().messages({
      "any.required": "Last name is required.",
      "string.empty": "Last name cannot be empty",
      "string.pattern.base": "Last name must be letters only, and must be at least 3 characters."
    }),
    email: Joi.string().email().trim().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email format"
    }),
specialization: Joi.string().trim().min(2).max(100).required().messages({
"any.required": "Specialization is required",
"string.empty": "Specialization cannot be empty",
"string.min": "Specialization must be at least 2 characters",
"string.max": "Specialization must not be more than 100 characters"
}),

qualification: Joi.string().trim().min(2).max(200).required().messages({
"any.required": "Qualifications are required",
"string.empty": "Qualifications cannot be empty",
"string.min": "Qualifications must be at least 2 characters",
"string.max": "Qualifications must not be more than 200 characters"
}),

experience: Joi.number().integer().min(0).max(70).required().messages({
"any.required": "Experience is required",
"number.base": "Experience must be a number",
"number.integer": "Experience must be a whole number",
"number.min": "Experience cannot be negative",
"number.max": "Experience cannot be more than 70 years"
}),

phoneNumber: Joi.string().trim().pattern(new RegExp('^[0-9]{10,15}$')).required().messages({
"any.required": "Phone number is required",
"string.empty": "Phone number cannot be empty",
"string.pattern.base": "Phone number must contain 10 to 15 digits only."
}),

departmentId: Joi.string().uuid().required().messages({
"any.required": "Department id is required",
"string.guid": "Department id must be a valid id",
"string.empty": "Department id is required"
})
});

const { error } = schema.validate(req.body);
  
  if (error) {
   return res.status(400).json({
      message: error.details[0].message
    })
  }

  next()
};



const updateDoctorValidation = (req, res, next) => {
const schema = Joi.object({
firstName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).optional().messages({
      "any.required": "First name is required.",
      "string.empty": "First name cannot be empty",
      "string.pattern.base": "First name must be letters only, and must be at least 3 characters."
    }),
    lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).optional().messages({
      "any.required": "Last name is required.",
      "string.empty": "Last name cannot be empty",
      "string.pattern.base": "Last name must be letters only, and must be at least 3 characters."
    }),
    email: Joi.string().email().trim().required().messages({
      "any.required": "Email is required",
      "string.empty": "Email cannot be empty",
      "string.email": "Email must be a valid email format"
    }),
specialization: Joi.string().trim().min(2).max(100).optional().messages({
"string.empty": "Specialization cannot be empty",
"string.min": "Specialization must be at least 2 characters",
"string.max": "Specialization must not be more than 100 characters"
}),

qualification: Joi.string().trim().min(2).max(200).optional().messages({
"string.empty": "Qualifications cannot be empty",
"string.min": "Qualifications must be at least 2 characters",
"string.max": "Qualifications must not be more than 200 characters"
}),

experience: Joi.number().integer().min(0).max(70).optional().messages({
"number.base": "Experience must be a number",
"number.integer": "Experience must be a whole number",
"number.min": "Experience cannot be negative",
"number.max": "Experience cannot be more than 70 years"
}),

phoneNumber: Joi.string().trim().pattern(new RegExp('^[0-9]{10,15}$')).optional().messages({
"string.empty": "Phone number cannot be empty",
"string.pattern.base": "Phone number must contain 10 to 15 digits only."
}),

departmentId: Joi.string().uuid().optional().messages({
"any.required": "Department id is required",
"string.guid": "Department id must be a valid id",
"string.empty": "Department id is required"
})

}).min(1).messages({
"object.min": "At least one field is required for update"
});

const { error } = schema.validate(req.body);
  
  if (error) {
   return res.status(400).json({
      message: error.details[0].message
    })
  }

  next()
};

module.exports = { 
    createDoctorValidation,
    updateDoctorValidation
 };
