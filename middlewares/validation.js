const Joi = require("joi");

// Register validation
const registerValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(50).required(),
    lastName: Joi.string().min(2).max(50).required(),
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(8).required(),
  });
  console.log("DATA: ", data);
  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(4).max(50).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
};

const businessValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    location: Joi.string().min(2).max(50).required(),
    phoneNumber: Joi.string().min(2).max(50).allow(null),
    website: Joi.string().min(5).allow(null),
    email: Joi.string().min(5).email().allow(null),
    organizationId: Joi.string().allow(null),
    categoryId: Joi.string().required(),
  });
  return schema.validate(data);
};

const categoryValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
  });
  return schema.validate(data);
};

const organizationValidation = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    userId: Joi.string().required(),
  });
  return schema.validate(data);
};

const reviewValidation = (data) => {
  const schema = Joi.object({
    reviewText: Joi.string().min(1).max(200),
    rating: Joi.string().required(),
    userId: Joi.string().required(),
    businessId: Joi.string().required(),
  });
  return schema.validate(data);
};

const replyValidation = (data) => {
  const schema = Joi.object({
    replyText: Joi.string().min(1).max(200).required(),
    userId: Joi.string().required(),
    businessId: Joi.string().required(),
    reviewId: Joi.string().required(),
  });
  return schema.validate(data);
};

const userValidation = (data) => {
  const schema = Joi.object({
    firstName: Joi.string().min(2).max(200).required(),
    lastName: Joi.string().required(),
    businessId: Joi.string().required(),
    reviewId: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = {
  registerValidation,
  loginValidation,
  businessValidation,
  categoryValidation,
  organizationValidation,
  reviewValidation,
  replyValidation
};
