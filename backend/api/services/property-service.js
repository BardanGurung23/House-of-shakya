const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const {
  propertyModel,
  propertyCategoryModel,
  propertyMediaModel,
  propertyFeatureModel,
  propertyNearbyPlaceModel,
  userModel,
  sequelize,
} = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const propertyInclude = [
  {
    model: propertyCategoryModel,
    as: "category",
    attributes: ["id", "name", "slug"],
  },
  {
    model: propertyMediaModel,
    as: "images",
    attributes: ["id", "image", "type"],
  },
  {
    model: propertyFeatureModel,
    as: "features",
    attributes: ["id", "title", "icon", "sortOrder"],
  },
  {
    model: propertyNearbyPlaceModel,
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

const syncImages = async (propertyId, images, transaction) => {
  if (!Array.isArray(images)) {
    return;
  }

  await propertyMediaModel.destroy({
    where: { propertyId },
    transaction,
  });

  if (images.length === 0) {
    return;
  }

  await propertyMediaModel.bulkCreate(
    images.map((image) => ({
      propertyId,
      image,
      type: getMediaType(image),
    })),
    { transaction },
  );
};

const syncFeatures = async (propertyId, features, transaction) => {
  if (!Array.isArray(features)) {
    return;
  }

  await propertyFeatureModel.destroy({
    where: { propertyId },
    transaction,
  });

  if (features.length === 0) {
    return;
  }

  await propertyFeatureModel.bulkCreate(
    features.map((feature, index) => ({
      propertyId,
      title: feature.title,
      icon: feature.icon || null,
      sortOrder: feature.sortOrder ?? index,
    })),
    { transaction },
  );
};

const syncNearbyPlaces = async (propertyId, nearbyPlaces, transaction) => {
  if (!Array.isArray(nearbyPlaces)) {
    return;
  }

  await propertyNearbyPlaceModel.destroy({
    where: { propertyId },
    transaction,
  });

  if (nearbyPlaces.length === 0) {
    return;
  }

  await propertyNearbyPlaceModel.bulkCreate(
    nearbyPlaces.map((place, index) => ({
      propertyId,
      name: place.name,
      type: place.type || null,
      distance: place.distance || null,
      sortOrder: place.sortOrder ?? index,
    })),
    { transaction },
  );
};

const getPropertyById = async (id) => {
  return propertyModel.findByPk(+id, {
    include: propertyInclude,
  });
};

const create = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    const { images, features, nearbyPlaces, ...propertyData } = req.body;
    if (!propertyData.slug && propertyData.name) {
      propertyData.slug = slugGenerator(propertyData.name);
    }

    const property = await propertyModel.create(propertyData, { transaction });

    if (!property) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROPERTY.CREATE_PROPERTY_FAILURE,
        data: null,
      };
    }

    await syncImages(property.id, images, transaction);
    await syncFeatures(property.id, features, transaction);
    await syncNearbyPlaces(property.id, nearbyPlaces, transaction);
    await transaction.commit();

    return {
      ...generalConstant.EN.PROPERTY.CREATE_PROPERTY_SUCCESS,
      data: await getPropertyById(property.id),
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
      sort = "latest",
      propertyCategoryId,
      agentId,
      slug,
      name,
      location,
      status,
    } = req.query;

    const filters = {};

    if (propertyCategoryId) {
      filters.propertyCategoryId = propertyCategoryId;
    }

    if (agentId) {
      filters.agentId = agentId;
    }

    if (status) {
      filters.status = status;
    }

    if (slug) {
      filters.slug = slug;
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

    const result = await paginate(propertyModel, {
      limit,
      page,
      filters,
      order,
      include: propertyInclude,
    });

    if (!result) {
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROPERTY.PROPERTY_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const property = await getPropertyById(req.params.id);

    if (!property) {
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROPERTY.PROPERTY_FOUND,
      data: property,
    };
  } catch (error) {
    throw error;
  }
};

const getBySlug = async (req) => {
  try {
    const property = await propertyModel.findOne({
      where: { slug: req.params.slug },
      include: propertyInclude,
    });

    if (!property) {
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.PROPERTY.PROPERTY_FOUND,
      data: property,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    const property = await propertyModel.findByPk(+req.params.id, {
      transaction,
    });

    if (!property) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_NOT_FOUND,
        data: null,
      };
    }

    const { images, features, nearbyPlaces, ...propertyData } = req.body;
    if (!propertyData.slug && propertyData.name) {
      propertyData.slug = slugGenerator(propertyData.name);
    }

    await property.update(propertyData, { transaction });
    await syncImages(property.id, images, transaction);
    await syncFeatures(property.id, features, transaction);
    await syncNearbyPlaces(property.id, nearbyPlaces, transaction);
    await transaction.commit();

    return {
      ...generalConstant.EN.PROPERTY.PROPERTY_UPDATE_SUCCESS,
      data: await getPropertyById(property.id),
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const property = await propertyModel.findByPk(+req.params.id);

    if (!property) {
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_DELETE_FAILURE,
        data: null,
      };
    }

    await property.destroy();

    return {
      ...generalConstant.EN.PROPERTY.PROPERTY_DELETE_SUCCESS,
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
