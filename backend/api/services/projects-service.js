const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const { projectsModel } = require("../../models");
const paginate = require("../../utils/paginate");

const create = async (req) => {
  try {
    const result = await projectsModel.create(req.body);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECTS.CREATE_PROJECTS_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECTS.CREATE_PROJECTS_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, type, name, location, sort = "latest" } = req.query;
    const filters = {};

    if (type) {
      filters.type = type;
    }

    if (name) {
      filters.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (location) {
      filters.location = {
        [Op.like]: `%${location}%`,
      };
    }

    let order = [["updatedAt", "DESC"]];

    if (sort === "oldest") {
      order = [["updatedAt", "ASC"]];
    }

    const result = await paginate(projectsModel, {
      limit,
      page,
      filters,
      order,
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROJECTS.PROJECTS_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECTS.PROJECTS_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await projectsModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECTS.PROJECTS_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECTS.PROJECTS_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const result = await projectsModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECTS.PROJECTS_UPDATE_FAILURE,
        data: null,
      };
    }

    await result.update(req.body);

    return {
      ...generalConstant.EN.PROJECTS.PROJECTS_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await projectsModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECTS.PROJECTS_DELETE_FAILURE,
        data: null,
      };
    }

    await result.destroy();

    return {
      ...generalConstant.EN.PROJECTS.PROJECTS_DELETE_SUCCESS,
      data: null,
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  list,
  getById,
  update,
  deleteById,
};
