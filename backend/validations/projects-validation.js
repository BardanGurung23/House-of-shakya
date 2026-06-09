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

const optionalNumber = joi.number().optional().allow(null, "");
const optionalString = joi.string().trim().optional().allow(null, "");
const featureSchema = joi.object({
  title: joi.string().trim().required().label("Feature Title"),
  icon: optionalString.label("Feature Icon"),
  sortOrder: optionalNumber.label("Feature Sort Order"),
});
const nearbyPlaceSchema = joi.object({
  name: joi.string().trim().required().label("Nearby Place Name"),
  type: optionalString.label("Nearby Place Type"),
  distance: optionalString.label("Nearby Place Distance"),
  sortOrder: optionalNumber.label("Nearby Place Sort Order"),
});
const mediaSchema = joi.alternatives().try(
  joi.string().trim(),
  joi
    .object({
      image: joi.string().trim().optional(),
      path: joi.string().trim().optional(),
      type: joi.string().valid("image", "video").optional(),
      caption: optionalString.label("Media Caption"),
      sortOrder: optionalNumber.label("Media Sort Order"),
    })
    .or("image", "path"),
);

const projectsPostValidation = async (req, res, next) => {
  const joiModel = joi.object({
    projectCategoryId: joi
      .number()
      .optional()
      .allow(null, "")
      .label("Category"),
    agentId: optionalNumber.label("Agent"),
    slug: optionalString.label("Slug"),
    type: joi.string().trim().required().label("Type"),
    name: joi.string().trim().required().label("Name"),
    location: joi.string().trim().required().label("Location"),
    googleMapURL: joi.string().trim().required().label("googleMapURL"),
    description: joi.string().required().label("Description"),
    overview: optionalString.label("Overview"),
    address: optionalString.label("Address"),
    price: optionalNumber.label("Price"),
    status: optionalString.label("Status"),
    size: optionalString.label("Size"),
    bedrooms: optionalNumber.label("Bedrooms"),
    bathrooms: optionalNumber.label("Bathrooms"),
    parking: optionalNumber.label("Parking"),
    view: optionalString.label("View"),
    yearBuilt: optionalNumber.label("Year Built"),
    completionDate: optionalString.label("Completion Date"),
    latitude: optionalNumber.label("Latitude"),
    longitude: optionalNumber.label("Longitude"),
    bannerMedia: optionalString.label("Banner Media"),
    bannerMediaType: joi
      .string()
      .valid("image", "video")
      .optional()
      .allow(null, "")
      .label("Banner Media Type"),
    images: joi.array().items(mediaSchema).optional().label("Images"),
    features: joi.array().items(featureSchema).optional().label("Features"),
    nearbyPlaces: joi
      .array()
      .items(nearbyPlaceSchema)
      .optional()
      .label("Nearby Places"),
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
    agentId: optionalNumber.label("Agent"),
    slug: optionalString.label("Slug"),
    type: joi.string().trim().optional().label("Type"),
    name: joi.string().trim().optional().label("Name"),
    location: joi.string().trim().optional().label("Location"),
    googleMapURL: joi.string().trim().optional().label("googleMapURL"),
    description: joi.string().optional().label("Description"),
    overview: optionalString.label("Overview"),
    address: optionalString.label("Address"),
    price: optionalNumber.label("Price"),
    status: optionalString.label("Status"),
    size: optionalString.label("Size"),
    bedrooms: optionalNumber.label("Bedrooms"),
    bathrooms: optionalNumber.label("Bathrooms"),
    parking: optionalNumber.label("Parking"),
    view: optionalString.label("View"),
    yearBuilt: optionalNumber.label("Year Built"),
    completionDate: optionalString.label("Completion Date"),
    latitude: optionalNumber.label("Latitude"),
    longitude: optionalNumber.label("Longitude"),
    bannerMedia: optionalString.label("Banner Media"),
    bannerMediaType: joi
      .string()
      .valid("image", "video")
      .optional()
      .allow(null, "")
      .label("Banner Media Type"),
    images: joi.array().items(mediaSchema).optional().label("Images"),
    features: joi.array().items(featureSchema).optional().label("Features"),
    nearbyPlaces: joi
      .array()
      .items(nearbyPlaceSchema)
      .optional()
      .label("Nearby Places"),
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
    agentId: joi.number().optional().label("Agent"),
    slug: joi.string().optional().label("Slug"),
    status: joi.string().optional().label("Status"),
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
