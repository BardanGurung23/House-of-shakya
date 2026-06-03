const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const {
  projectCategoryModel,
  projectsModel,
  projectMediaModel,
  sequelize,
} = require("../../models");
const paginate = require("../../utils/paginate");

const projectInclude = [
  {
    model: projectCategoryModel,
    as: "category",
    attributes: ["id", "name", "slug"],
  },
  {
    model: projectMediaModel,
    as: "images",
    attributes: ["id", "image", "type"],
  },
];

const getMediaType = (path = "") => {
  return /\.(mp4|mpeg|mov|webm|ogg)$/i.test(path) ? "video" : "image";
};

const syncImages = async (projectId, images, transaction) => {
  if (!Array.isArray(images)) {
    return;
  }

  await projectMediaModel.destroy({
    where: { projectId },
    transaction,
  });

  if (images.length === 0) {
    return;
  }

  await projectMediaModel.bulkCreate(
    images.map((image) => ({
      projectId,
      image,
      type: getMediaType(image),
    })),
    { transaction },
  );
};

const create = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    if (req.body.projectCategoryId) {
      const category = await projectCategoryModel.findByPk(
        +req.body.projectCategoryId,
        { transaction },
      );

      if (!category) {
        await transaction.rollback();
        return {
          ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_NOT_FOUND,
          data: null,
        };
      }
    }

    const { images, ...projectData } = req.body;
    const result = await projectsModel.create(projectData, { transaction });

    if (!result) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROJECTS.CREATE_PROJECTS_FAILURE,
        data: null,
      };
    }

    await syncImages(result.id, images, transaction);
    await transaction.commit();

    return {
      ...generalConstant.EN.PROJECTS.CREATE_PROJECTS_SUCCESS,
      data: await projectsModel.findByPk(result.id, {
        include: projectInclude,
      }),
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const list = async (req) => {
  try {
    const {
      limit,
      page,
      projectCategoryId,
      type,
      name,
      location,
      sort = "latest",
    } = req.query;
    const filters = {};

    if (projectCategoryId) {
      filters.projectCategoryId = projectCategoryId;
    }

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
      include: projectInclude,
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
    const result = await projectsModel.findByPk(+req.params.id, {
      include: projectInclude,
    });

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
  const transaction = await sequelize.transaction();

  try {
    const result = await projectsModel.findByPk(+req.params.id, {
      transaction,
    });

    if (!result) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROJECTS.PROJECTS_UPDATE_FAILURE,
        data: null,
      };
    }

    if (req.body.projectCategoryId) {
      const category = await projectCategoryModel.findByPk(
        +req.body.projectCategoryId,
        { transaction },
      );

      if (!category) {
        await transaction.rollback();
        return {
          ...generalConstant.EN.PROJECT_CATEGORY.PROJECT_CATEGORY_NOT_FOUND,
          data: null,
        };
      }
    }

    const { images, ...projectData } = req.body;
    await result.update(projectData, { transaction });
    await syncImages(result.id, images, transaction);
    await transaction.commit();

    return {
      ...generalConstant.EN.PROJECTS.PROJECTS_UPDATE_SUCCESS,
      data: await projectsModel.findByPk(result.id, {
        include: projectInclude,
      }),
    };
  } catch (error) {
    await transaction.rollback();
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
