const teamMemberService = require("../services/team-member-service");
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
    const result = await teamMemberService.create(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const result = await teamMemberService.list(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const result = await teamMemberService.getById(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const result = await teamMemberService.update(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const updateOrder = async (req, res, next) => {
  try {
    const result = await teamMemberService.updateOrder(req);
    return sendResult(res, result);
  } catch (err) {
    logger.error(err);
    next(err);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const result = await teamMemberService.deleteById(req);
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
  updateOrder,
  deleteOne,
};
