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
  agentId: joi.number().optional().allow(null).label("Agent"),
  name: joi.string().trim().required().label("Name"),
  slug: joi.string().trim().optional().allow(null, "").label("Slug"),
  type: joi.string().trim().required().label("Type"),
  location: joi.string().trim().required().label("Location"),
  description: joi
    .string()
    .trim()
    .optional()
    .allow(null, "")
    .label("Description"),
  problem: joi.string().trim().optional().allow(null, "").label("Problem"),
  solution: joi.string().trim().optional().allow(null, "").label("Solution"),
  beds: joi.number().integer().min(0).optional().allow(null).label("Beds"),
  bath: joi.number().integer().min(0).optional().allow(null).label("Bath"),
  anna: joi.number().min(0).optional().allow(null).label("Anna"),
  price: joi.number().min(0).required().label("Price"),
  status: joi.string().optional().allow(null, "").label("Status"),
  size: joi.string().trim().optional().allow(null, "").label("Size"),
  parking: joi
    .number()
    .integer()
    .min(0)
    .optional()
    .allow(null)
    .label("Parking"),
  view: joi.string().trim().optional().allow(null, "").label("View"),
  yearBuilt: joi
    .number()
    .integer()
    .min(0)
    .optional()
    .allow(null)
    .label("Year Built"),
  completionDate: joi
    .string()
    .trim()
    .optional()
    .allow(null, "")
    .label("Completion Date"),
  googleMapURL: joi
    .string()
    .trim()
    .optional()
    .allow(null, "")
    .label("Google Map URL"),
  images: joi.array().items(joi.string().trim()).optional().label("Images"),
  features: joi
    .array()
    .items(
      joi.object({
        title: joi.string().trim().required().label("Feature Title"),
        icon: joi.string().trim().optional().allow(null, "").label("Icon"),
        sortOrder: joi
          .number()
          .integer()
          .min(0)
          .optional()
          .allow(null)
          .label("Sort Order"),
      }),
    )
    .optional()
    .label("Features"),
  nearbyPlaces: joi
    .array()
    .items(
      joi.object({
        name: joi.string().trim().required().label("Nearby Place Name"),
        type: joi.string().trim().optional().allow(null, "").label("Type"),
        distance: joi
          .string()
          .trim()
          .optional()
          .allow(null, "")
          .label("Distance"),
        sortOrder: joi
          .number()
          .integer()
          .min(0)
          .optional()
          .allow(null)
          .label("Sort Order"),
      }),
    )
    .optional()
    .label("Nearby Places"),
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
    propertyCategoryId: propertyFields.propertyCategoryId,
    agentId: propertyFields.agentId,
    name: joi.string().trim().optional().label("Name"),
    slug: propertyFields.slug,
    type: propertyFields.type,
    location: joi.string().trim().optional().label("Location"),
    description: propertyFields.description,
    problem: propertyFields.problem,
    solution: propertyFields.solution,
    beds: propertyFields.beds,
    bath: propertyFields.bath,
    anna: propertyFields.anna,
    price: joi.number().min(0).optional().label("Price"),
    status: propertyFields.status,
    size: propertyFields.size,
    parking: propertyFields.parking,
    view: propertyFields.view,
    yearBuilt: propertyFields.yearBuilt,
    completionDate: propertyFields.completionDate,
    googleMapURL: propertyFields.googleMapURL,
    images: joi.array().items(joi.string().trim()).optional().label("Images"),
    features: propertyFields.features,
    nearbyPlaces: propertyFields.nearbyPlaces,
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
    agentId: joi.number().optional().label("Agent"),
    status: joi.string().optional().label("Status"),
    slug: joi.string().optional().label("Slug"),
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
