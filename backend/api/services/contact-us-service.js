const { contactUsModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");
const { Op } = require("sequelize");
const paginate = require("../../utils/paginate");
const sequelize = require("../../models").sequelize;

const create = async (req) => {
  try {
    const contact = await contactUsModel.create(req.body);
    if (!contact) {
      return {
        ...generalConstant.EN.CONTACT.CREATE_CONTACT_FAILURE,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.CONTACT.CREATE_CONTACT_SUCCESS,
      data: contact,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    let { limit, page, name } = req.query;
    const filters = {};
    const include = [];
    if (name) {
      filters.name = {
        [Op.like]: `%${name}`,
      };
    }
    const contacts = await paginate(contactUsModel, {
      limit,
      page,
      filters,
      include,
    });
    if (!contacts) {
      return {
        ...generalConstant.EN.CONTACT.CONTACT_NOT_FOUND,
        data: null,
      };
    }
    return {
      ...generalConstant.EN.CONTACT.CONTACT_LIST_SUCCESS,
      data: contacts,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const contact = await contactUsModel.findByPk(req.params.id);
    if (!contact)
      return {
        ...generalConstant.EN.CONTACT.CONTACT_NOT_FOUND,
        data: null,
      };

    return {
      ...generalConstant.EN.CONTACT.CONTACT_FOUND,
      data: contact,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const contact = await contactUsModel.findByPk(req.params.id);
    if (!contact)
      return {
        ...generalConstant.EN.CONTACT.CONTACT_NOT_FOUND,
        data: null,
      };

    await contact.update(req.body);
    return {
      ...generalConstant.EN.CONTACT.UPDATE_CONTACT_SUCCESS,
      data: contact,
    };
  } catch (error) {
    throw error;
  }
};

const remove = async (req) => {
  try {
    const contact = await contactUsModel.findByPk(req.params.id);
    if (!contact)
      return {
        ...generalConstant.EN.CONTACT.CONTACT_NOT_FOUND,
        data: null,
      };

    await contact.destroy();
    return {
      ...generalConstant.EN.CONTACT.DELETE_CONTACT_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = { create, list, getById, update, remove };
