const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const { projectCategoryModel, projectsModel } = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const create = async (req) => {
  try {
    req.body.slug = slugGenerator(req.body.name);
    const result = await projectCategoryModel.create(req.body);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.CREATE_PROJECT_CATEGORY_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECT_CATEGORY.CREATE_PROJECT_CATEGORY_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, name, slug } = req.query;
    const filters = {};

    if (name) {
      filters.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (slug) {
      filters.slug = {
        [Op.like]: `%${slug}%`,
      };
    }

    const result = await paginate(projectCategoryModel, {
      limit,
      page,
      filters,
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await projectCategoryModel.findByPk(+req.params.id, {
      include: [
        {
          model: projectsModel,
          as: "projects",
        },
      ],
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const result = await projectCategoryModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_UPDATE_FAILURE,
        data: null,
      };
    }

    if (req.body.name) {
      req.body.slug = slugGenerator(req.body.name);
    }

    await result.update(req.body);

    return {
      ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await projectCategoryModel.findByPk(+req.params.id, {
      include: [
        {
          model: projectsModel,
          as: "projects",
        },
      ],
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_DELETE_FAILURE,
        data: null,
      };
    }

    if (result.projects?.length > 0) {
      return {
        ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_IN_USED,
        data: null,
      };
    }

    await result.destroy();

    return {
      ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_DELETE_SUCCESS,
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
