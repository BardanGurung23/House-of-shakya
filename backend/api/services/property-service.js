const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const {
  propertyModel,
  propertyCategoryModel,
  propertyMediaModel,
  sequelize,
} = require("../../models");
const paginate = require("../../utils/paginate");

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

const getPropertyById = async (id) => {
  return propertyModel.findByPk(+id, {
    include: propertyInclude,
  });
};

const create = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    const { images, ...propertyData } = req.body;
    const property = await propertyModel.create(propertyData, { transaction });

    if (!property) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.PROPERTY.CREATE_PROPERTY_FAILURE,
        data: null,
      };
    }

    await syncImages(property.id, images, transaction);
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
      name,
      location,
    } = req.query;

    const filters = {};

    if (propertyCategoryId) {
      filters.propertyCategoryId = propertyCategoryId;
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

    const { images, ...propertyData } = req.body;
    await property.update(propertyData, { transaction });
    await syncImages(property.id, images, transaction);
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
  update,
  deleteById,
};
