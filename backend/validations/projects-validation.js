const joi = require("joi");
const httpStatus = require("http-status");
const responseHelper = require("../helpers/response-helper");
const messageConstant = require("../constants/message-constant");
const isEmpty = require("../helpers/is-empty-helper");
const {
  validateRequestBody,
  validateRequestQuery,
} = require("../helpers/validator-helper");

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

const projectsPostValidation = async (req, res, next) => {
  const joiModel = joi.object({
    projectCategoryId: joi
      .number()
      .optional()
      .allow(null, "")
      .label("Category"),
    type: joi.string().trim().required().label("Type"),
    name: joi.string().trim().required().label("Name"),
    location: joi.string().trim().required().label("Location"),
    description: joi.string().required().label("Description"),
    images: joi.array().items(joi.string().trim()).optional().label("Images"),
  });
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const projectsPutValidation = async (req, res, next) => {
  const joiModel = joi.object({
    projectCategoryId: joi
      .number()
      .optional()
      .allow(null, "")
      .label("Category"),
    type: joi.string().trim().optional().label("Type"),
    name: joi.string().trim().optional().label("Name"),
    location: joi.string().trim().optional().label("Location"),
    description: joi.string().optional().label("Description"),
    images: joi.array().items(joi.string().trim()).optional().label("Images"),
  });
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const projectsListValidation = async (req, res, next) => {
  const joiModel = joi.object({
    page: joi.number().optional().label("page"),
    limit: joi.number().optional().label("limit"),
    sort: joi.string().valid("latest", "oldest").optional().label("sort"),
    projectCategoryId: joi.number().optional().label("Category"),
    type: joi.string().optional().label("Type"),
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
  projectsPostValidation,
  projectsPutValidation,
  projectsListValidation,
};
