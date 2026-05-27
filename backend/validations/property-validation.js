const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");
const {
  validateRequestBody,
  validateRequestQuery,
} = require("../helpers/validator-helper");

const propertyFields = {
  propertyCategoryId: joi
    .number()
    .optional()
    .allow(null)
    .label("Property Category"),
  name: joi.string().trim().required().label("Name"),
  location: joi.string().trim().required().label("Location"),
  beds: joi.number().integer().min(0).optional().allow(null).label("Beds"),
  bath: joi.number().integer().min(0).optional().allow(null).label("Bath"),
  anna: joi.number().min(0).optional().allow(null).label("Anna"),
  price: joi.number().min(0).required().label("Price"),
  images: joi.array().items(joi.string().trim()).optional().label("Images"),
};

const sendValidationError = (res, errors) => {
  return responseHelper.sendResponse(
    res,
    httpStatus.BAD_REQUEST,
    false,
    null,
    errors,
    messageConstant.EN.INPUT_ERROR,
    null,
  );
};

const propertyPostValidation = async (req, res, next) => {
  const joiModel = joi.object(propertyFields);
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const propertyPutValidation = async (req, res, next) => {
  const joiModel = joi.object({
    propertyCategoryId: joi
      .number()
      .optional()
      .allow(null)
      .label("Property Category"),
    name: joi.string().trim().optional().label("Name"),
    location: joi.string().trim().optional().label("Location"),
    beds: joi.number().integer().min(0).optional().allow(null).label("Beds"),
    bath: joi.number().integer().min(0).optional().allow(null).label("Bath"),
    anna: joi.number().min(0).optional().allow(null).label("Anna"),
    price: joi.number().min(0).optional().label("Price"),
    images: joi.array().items(joi.string().trim()).optional().label("Images"),
  });
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const propertyListValidation = async (req, res, next) => {
  const joiModel = joi.object({
    page: joi.number().optional().label("page"),
    limit: joi.number().optional().label("limit"),
    sort: joi.string().valid("latest", "oldest").optional().label("sort"),
    propertyCategoryId: joi.number().optional().label("Property Category"),
    name: joi.string().optional().label("Name"),
    location: joi.string().optional().label("Location"),
  });
  const errors = await validateRequestQuery(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

module.exports = {
  propertyPostValidation,
  propertyPutValidation,
  propertyListValidation,
};
