const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const {
  projectCategoryModel,
  projectsModel,
  projectMediaModel,
  projectFeatureModel,
  projectNearbyPlaceModel,
  userModel,
  sequelize,
} = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const projectInclude = [
  {
    model: projectCategoryModel,
    as: "category",
    attributes: ["id", "name", "slug"],
  },
  {
    model: projectMediaModel,
    as: "images",
    attributes: ["id", "image", "type", "caption", "sortOrder"],
  },
  {
    model: projectFeatureModel,
    as: "features",
    attributes: ["id", "title", "icon", "sortOrder"],
  },
  {
    model: projectNearbyPlaceModel,
    as: "nearbyPlaces",
    attributes: ["id", "name", "type", "distance", "sortOrder"],
  },
  {
    model: userModel,
    as: "agent",
    attributes: ["id", "firstName", "lastName", "email", "mobileNo", "imageUrl"],
  },
];

const getMediaType = (path = "") => {
  return /\.(mp4|mpeg|mov|webm|ogg)$/i.test(path) ? "video" : "image";
};

const mapMediaPayload = (media, index) => {
  const image = typeof media === "string" ? media : media.image || media.path;

  return {
    image,
    type: media.type || getMediaType(image),
    caption: typeof media === "string" ? null : media.caption || null,
    sortOrder: typeof media === "string" ? index : media.sortOrder ?? index,
  };
};

const normalizeProjectMedia = (projectData) => {
  if (!Object.prototype.hasOwnProperty.call(projectData, "bannerMedia")) {
    return projectData;
  }

  if (!projectData.bannerMedia) {
    projectData.bannerMedia = null;
    projectData.bannerMediaType = null;
    return projectData;
  }

  projectData.bannerMediaType =
    projectData.bannerMediaType || getMediaType(projectData.bannerMedia);

  return projectData;
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
    images.map((image, index) => ({
      projectId,
      ...mapMediaPayload(image, index),
    })),
    { transaction },
  );
};

const syncFeatures = async (projectId, features, transaction) => {
  if (!Array.isArray(features)) {
    return;
  }

  await projectFeatureModel.destroy({
    where: { projectId },
    transaction,
  });

  if (features.length === 0) {
    return;
  }

  await projectFeatureModel.bulkCreate(
    features.map((feature, index) => ({
      projectId,
      title: feature.title,
      icon: feature.icon || null,
      sortOrder: feature.sortOrder ?? index,
    })),
    { transaction },
  );
};

const syncNearbyPlaces = async (projectId, nearbyPlaces, transaction) => {
  if (!Array.isArray(nearbyPlaces)) {
    return;
  }

  await projectNearbyPlaceModel.destroy({
    where: { projectId },
    transaction,
  });

  if (nearbyPlaces.length === 0) {
    return;
  }

  await projectNearbyPlaceModel.bulkCreate(
    nearbyPlaces.map((place, index) => ({
      projectId,
      name: place.name,
      type: place.type || null,
      distance: place.distance || null,
      sortOrder: place.sortOrder ?? index,
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

    if (req.body.agentId) {
      const agent = await userModel.findByPk(+req.body.agentId, {
        transaction,
      });

      if (!agent) {
        await transaction.rollback();
        return {
          ...generalConstant.EN.USER.User_NOT_FOUND,
          data: null,
        };
      }
    }

    const { images, features, nearbyPlaces, ...projectData } = req.body;
    normalizeProjectMedia(projectData);
    if (!projectData.slug && projectData.name) {
      projectData.slug = slugGenerator(projectData.name);
    }
    const result = await projectsModel.create(projectData, { transaction });

    if (!result) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROJECTS.CREATE_PROJECTS_FAILURE,
        data: null,
      };
    }

    await syncImages(result.id, images, transaction);
    await syncFeatures(result.id, features, transaction);
    await syncNearbyPlaces(result.id, nearbyPlaces, transaction);
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
      agentId,
      slug,
      status,
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

    if (agentId) {
      filters.agentId = agentId;
    }

    if (slug) {
      filters.slug = slug;
    }

    if (status) {
      filters.status = status;
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

const getBySlug = async (req) => {
  try {
    const result = await projectsModel.findOne({
      where: { slug: req.params.slug },
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

    if (req.body.agentId) {
      const agent = await userModel.findByPk(+req.body.agentId, {
        transaction,
      });

      if (!agent) {
        await transaction.rollback();
        return {
          ...generalConstant.EN.USER.User_NOT_FOUND,
          data: null,
        };
      }
    }

    const { images, features, nearbyPlaces, ...projectData } = req.body;
    normalizeProjectMedia(projectData);
    if (!projectData.slug && projectData.name) {
      projectData.slug = slugGenerator(projectData.name);
    }
    await result.update(projectData, { transaction });
    await syncImages(result.id, images, transaction);
    await syncFeatures(result.id, features, transaction);
    await syncNearbyPlaces(result.id, nearbyPlaces, transaction);
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
  getBySlug,
  update,
  deleteById,
};
