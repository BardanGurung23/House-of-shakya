const generalConstant = require("../../constants/general-constant");
const { enquireModel, propertyModel, userModel } = require("../../models");
const paginate = require("../../utils/paginate");
const { sendMail } = require("../../helpers/mailer/mailer");

const includeProperty = [
  {
    model: propertyModel,
    as: "property",
    attributes: ["id", "name", "location", "price"],
  },
  {
    model: userModel,
    as: "agent",
    attributes: ["id", "firstName", "lastName", "email", "mobileNo", "imageUrl"],
  },
];

const create = async (req) => {
  try {
    const property = await propertyModel.findByPk(+req.body.propertyId);

    if (!property) {
      return {
        ...generalConstant.EN.PROPERTY.PROPERTY_NOT_FOUND,
        data: null,
      };
    }

    const result = await enquireModel.create({
      ...req.body,
      agentId: property.agentId || null,
    });

    if (!result) {
      return {
        ...generalConstant.EN.ENQUIRE.CREATE_ENQUIRE_FAILURE,
        data: null,
      };
    }
    const placeholders = {
      name: `${req.body.full_name}`,
      email: `${req.body.email}`,
      propertyName: `${property.name}`,
    };

    sendMail("propertyEnquiry", placeholders, req.body.email).catch((error) => {
      console.error("Property enquiry email failed:", error);
    });

    return {
      ...generalConstant.EN.ENQUIRE.CREATE_ENQUIRE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, propertyId, agentId } = req.query;
    const filters = {};

    if (propertyId) {
      filters.propertyId = propertyId;
    }

    if (agentId) {
      filters.agentId = agentId;
    }

    const result = await paginate(enquireModel, {
      limit,
      page,
      filters,
      include: includeProperty,
    });

    if (!result) {
      return {
        ...generalConstant.EN.ENQUIRE.ENQUIRE_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.ENQUIRE.ENQUIRE_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await enquireModel.findByPk(+req.params.id, {
      include: includeProperty,
    });

    if (!result) {
      return {
        ...generalConstant.EN.ENQUIRE.ENQUIRE_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.ENQUIRE.ENQUIRE_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await enquireModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.ENQUIRE.ENQUIRE_DELETE_FAILURE,
        data: null,
      };
    }

    await result.destroy();

    return {
      ...generalConstant.EN.ENQUIRE.ENQUIRE_DELETE_SUCCESS,
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
  deleteById,
};
