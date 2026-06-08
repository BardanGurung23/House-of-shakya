const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");
const {
  validateRequestBody,
  validateRequestQuery,
} = require("../helpers/validator-helper");

const enquirePostValidation = async (req, res, next) => {
  const joiModel = joi.object({
    propertyId: joi.number().required().label("Property"),
    full_name: joi.string().required().label("Full Name"),
    email: joi.string().email().required().label("Email"),
    phone: joi.string().allow(null, "").label("Phone"),
    message: joi.string().required().label("Message"),
  });

  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }

  return next();
};

const enquireListValidation = async (req, res, next) => {
  const joiModel = joi.object({
    page: joi.number().optional().label("page"),
    limit: joi.number().optional().label("limit"),
    propertyId: joi.number().optional().label("Property"),
    agentId: joi.number().optional().label("Agent"),
  });

  const errors = await validateRequestQuery(req, res, joiModel);

  if (!isEmpty(errors)) {
    return responseHelper.sendResponse(
      res,
      httpStatus.BAD_REQUEST,
      false,
      null,
      errors,
      messageConstant.EN.INPUT_ERROR,
      null,
    );
  }

  return next();
};

module.exports = {
  enquireListValidation,
  enquirePostValidation,
};
