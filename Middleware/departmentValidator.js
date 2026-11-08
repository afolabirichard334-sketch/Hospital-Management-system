const Joi = require('joi');

const createDepartmentValidation = (req, res, next) => {
const schema = Joi.object({
name: Joi.string().trim().pattern(new RegExp('^[A-Za-z ]{2,100}$')).required().messages({
 "any.required": "Department name is required",
 "string.empty": "Department name cannot be empty",
 "string.pattern.base": "Department name must contain letters only and be between 2 and 100 characters."
}),

description: Joi.string().trim().min(5).max(500).required().messages({
 "any.required": "Description is required",
 "string.empty": "Description cannot be empty",
 "string.min": "Description must be at least 5 characters",
 "string.max": "Description must not be more than 500 characters"
}),

location: Joi.string().trim().min(2).max(100).required().messages({
 "any.required": "Location is required",
 "string.empty": "Location cannot be empty",
 "string.min": "Location must be at least 2 characters",
 "string.max": "Location must not be more than 100 characters"
}),

phoneNumber: Joi.string().trim().pattern(new RegExp('^[0-9]{10,15}$')).required().messages({
 "any.required": "Phone number is required",
 "string.empty": "Phone number cannot be empty",
 "string.pattern.base": "Phone number must contain 10 to 15 digits only."
}),

email: Joi.string().trim().email().lowercase().required().messages({
 "any.required": "Email is required",
 "string.empty": "Email cannot be empty",
 "string.email": "Email must be a valid email format"
}),

isActive: Joi.boolean().optional().messages({
 "boolean.base": "isActive must be true or false"
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






const updateDepartmentValidation = (req, res, next) => {
const schema = Joi.object({
name: Joi.string().trim().pattern(new RegExp('^[A-Za-z ]{2,100}$')).optional().messages({
"string.empty": "Department name cannot be empty",
"string.pattern.base": "Department name must contain letters only and be between 2 and 100 characters."
}),

description: Joi.string().trim().min(5).max(500).optional().messages({
"string.empty": "Description cannot be empty",
"string.min": "Description must be at least 5 characters",
"string.max": "Description must not be more than 500 characters"
}),

location: Joi.string().trim().min(2).max(100).optional().messages({
"string.empty": "Location cannot be empty",
"string.min": "Location must be at least 2 characters",
"string.max": "Location must not be more than 100 characters"
}),

phoneNumber: Joi.string().trim().pattern(new RegExp('^[0-9]{10,15}$')).optional().messages({
"string.empty": "Phone number cannot be empty",
"string.pattern.base": "Phone number must contain 10 to 15 digits only."
}),

email: Joi.string().trim().email().lowercase().optional().messages({
"string.empty": "Email cannot be empty",
"string.email": "Email must be a valid email format"
}),

isActive: Joi.boolean().optional().messages({
"boolean.base": "isActive must be true or false"
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
     createDepartmentValidation,
     updateDepartmentValidation

 };

