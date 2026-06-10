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

const fields = {
  name: joi.string().trim().label("Name"),
  designation: joi.string().trim().label("Designation"),
  department: joi.string().trim().optional().allow("", null).label("Department"),
  bio: joi.string().trim().optional().allow("", null).label("Bio"),
  image: joi.string().trim().optional().allow("", null).label("Image"),
  email: joi.string().trim().email().optional().allow("", null).label("Email"),
  phone: joi.string().trim().optional().allow("", null).label("Phone"),
  linkedinUrl: joi
    .string()
    .trim()
    .optional()
    .allow("", null)
    .label("LinkedIn URL"),
  sortOrder: joi.number().optional().allow(null).label("Sort Order"),
  isFeatured: joi.boolean().optional().label("Featured"),
  isActive: joi.boolean().optional().label("Active"),
};

const teamMemberPostValidation = async (req, res, next) => {
  const joiModel = joi.object({
    ...fields,
    name: fields.name.required(),
    designation: fields.designation.required(),
  });
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const teamMemberPutValidation = async (req, res, next) => {
  const joiModel = joi.object(fields);
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const teamMemberListValidation = async (req, res, next) => {
  const joiModel = joi.object({
    page: joi.number().optional().label("page"),
    limit: joi.number().optional().label("limit"),
    name: joi.string().optional().label("Name"),
    designation: joi.string().optional().label("Designation"),
    isActive: joi.boolean().optional().label("Active"),
    isFeatured: joi.boolean().optional().label("Featured"),
  });
  const errors = await validateRequestQuery(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

const teamMemberOrderValidation = async (req, res, next) => {
  const joiModel = joi.array().items(
    joi.object({
      id: joi.number().required().label("Team Member"),
      sortOrder: joi.number().required().label("Sort Order"),
    }),
  );
  const errors = await validateRequestBody(req, res, joiModel);

  if (!isEmpty(errors)) {
    return sendValidationError(res, errors);
  }

  return next();
};

module.exports = {
  teamMemberPostValidation,
  teamMemberPutValidation,
  teamMemberListValidation,
  teamMemberOrderValidation,
};
