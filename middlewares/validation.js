const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(5).required(),
    lastName: Joi.string().min(5).required(),
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });
  console.log("DATA: ", data);
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(5).required(),
    password: Joi.string().min(5).required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
};
