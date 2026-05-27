const projectsService = require("../services/projects-service");
const responseHelper = require("../../helpers/response-helper");
const logger = require("../../configs/logger");

const sendResult = (res, result) => {
  return responseHelper.sendResponse(
    res,
    result.status,
    result.success,
    result.data,
    result.errors,
    result.message,
    result.token,
  );
};

const create = async (req, res, next) => {
  try {
    const result = await projectsService.create(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await projectsService.list(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await projectsService.getById(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await projectsService.update(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await projectsService.deleteById(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

module.exports = {
  create,
  list,
  getById,
  update,
  deleteOne,
};
