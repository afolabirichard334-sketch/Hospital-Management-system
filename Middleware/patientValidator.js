const Joi = require("joi");

const patientValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).required().messages({
            "any.required": "First Name Required",
            "string.empty": "First name must not be empty",
            "string.pattern.base": "First name cannot contain number , special character or empty space and must be at least three characters"
        }),
        
        lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).required().messages({
            "any.required": "Last Name Required",
            "string.empty": "Last name must not be empty",
            "string.pattern.base": "Last name cannot contain number, special character or empty space and must be at least three characters"
        }),
        email: Joi.string().email().trim().required().messages({
            "any.required": "Email is required",
            "string.empty": "Email cannnot be empty",
            "string.email": "Email field must be valid email address"
        }),
        
        phoneNumber: Joi.string().trim().pattern(/^\d{10,}$/).required().messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number must be a digit and a minimum of 10"
        }),
        gender: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{4,}$')).required().messages({
            "any.required": "Gender Required",
            "string.empty": "Gender must not be empty",
            "string.pattern.base": "Gender cannot contain number , special character or empty space and must be at least four characters"
        }),
        weight: Joi.number().positive().required().messages({
            "any.required": "Weight is required",
            "number.base": "Weight must be a number",
            "number.empty": "Weight must not be empty",
            "number.positive": "Weight must be greater than zero",
        }),
        chronic_condition: Joi.string().trim().optional().allow("").messages({
            "string.base": "Chronic condition must be a text",
        }),
       
        allergies: Joi.string().trim().optional().allow("").messages({
            "string.base.pattern": "Allergies must be a text",
        }),

        dateOfBirth: Joi.date().iso().max("now").required().messages({
            "any.required": "Date of birth is required",
            "date.base": "Please enter a valid date of birth",
            "date.format": "Date must follow YYYY-MM-DD format",
            "date.max": "Date of birth cannot be in the future"
        }),
        
        height: Joi.number().positive().required().messages({
            "any.required": "Height is required",
            "number.base": "Height must be a number",
            "number.empty": "Height must not be empty",
            "number.positive": "Height must be greater than zero",
        }),
        
        // FIXED: Added missing closing parenthesis ')' at the end of the line
        bloodType: Joi.string().trim().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").required().messages({
            "any.required": "Blood type is required",
            "any.only": "Please select a valid blood type (A+, A-, B+, B-, AB+, AB-, O+, O-)"
        })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

const patientUpdateValidation = (req, res, next) => {
    const schema = Joi.object({
        firstName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).optional().allow("").messages({
            "any.required": "First Name Required",
            "string.empty": "First name must not be empty",
            "string.pattern.base": "First name cannot contain number , special character or empty space and must be at least three characters"
        }),
        
        lastName: Joi.string().trim().pattern(new RegExp('^[A-Za-z]{3,}$')).optional().allow("").messages({
            "any.required": "Last Name Required",
            "string.empty": "Last name must not be empty",
            "string.pattern.base": "Last name cannot contain number, special cha"
        }),
        email: Joi.string().email().trim().optional().messages({
            "any.required": "Email is required",
            "string.empty": "Email cannnot be empty",
            "string.email": "Email field must be valid email address"
        }),
        
        phoneNumber: Joi.string().trim().pattern(/^\d{10,}$/).optional().allow("").messages({
            "any.required": "Phone number is required",
            "string.empty": "Phone number must be a digit and a minimum of 10"
        }),
       
        weight: Joi.number().positive().optional().messages({
            "any.required": "Weight is required",
            "number.base": "Weight must be a number",
            "number.empty": "Weight must not be empty",
            "number.positive": "Weight must be greater than zero",
        }),
        chronic_condition: Joi.string().trim().optional().allow("").messages({
            "string.base": "Chronic condition must be a text",
        }),
       
        allergies: Joi.string().trim().optional().allow("").messages({
            "string.base": "Allergies must be a text",
        }),
        
        
        height: Joi.number().positive().optional().messages({
            "any.required": "Height is required",
            "number.base": "Height must be a number",
            "number.empty": "Height must not be empty",
            "number.positive": "Height must be greater than zero",
        }),
        
       
        bloodType: Joi.string().trim().valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-").optional().allow("").messages({
            "any.only": "Please select a valid blood type"
        })
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({
            message: error.details[0].message
        });
    }

    next();
};

module.exports = { patientValidation, patientUpdateValidation };
