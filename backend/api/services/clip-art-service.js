const { departmentModel, clipArtModel } = require("../../models");
const generalConstant = require("../../constants/general-constant");

const paginate = require("../../utils/paginate");
const create = async (req) => {
  try {
    const { departmentId } = req.body;

    // Check if the department exists
    const isUniquePositionNoInDepartment = await clipArtModel.findOne({
      where: {
        departmentId,
        positionNumber: req.body?.positionNumber,
      },
    });
    if (isUniquePositionNoInDepartment) {
      return {
        ...generalConstant.EN.CLIPART.POSITION_NUMBER_ALREADY_EXISTS,
        data: null,
      };
    }
    const isDepartment = await departmentModel.findByPk(departmentId);
    if (!isDepartment) {
      return {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }

    // Create clip art
    const clipArt = await clipArtModel.create(req.body);
    if (!clipArt) {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.CLIPART.CREATE_CLIPART_SUCCESS,
      data: clipArt,
    };
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const getById = async (req) => {
  try {
    const clipArt = await clipArtModel.findByPk(+req.params.id);

    if (clipArt) {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_FOUND,
        data: clipArt,
      };
    } else {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_NOT_FOUND,
        data: null,
      };
    }
  } catch (error) {
    // Log or handle the error
    throw error;
  }
};

const findAllClipArt = async (req) => {
  try {
    let { limit, page } = req.query;
    const filters = {};
    const include = [];
    const result = await paginate(clipArtModel, {
      limit,
      page,
      filters,
      include,
    });
    if (result) {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_LIST_SUCCESS,
        data: result,
      };
    } else {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_LIST_FAILURE,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const clipArt = await clipArtModel.findByPk(+req.params.id);

    if (!clipArt) {
      return {
        ...generalConstant.EN.DEPARTMENT.NOT_FOUND,
        data: null,
      };
    }
    if (req.body.positionNumber) {
      const isUniquePositionNoInDepartment = await clipArtModel.findOne({
        where: {
          departmentId: clipArt.departmentId,
          positionNumber: req.body.positionNumber,
        },
      });
      if (
        isUniquePositionNoInDepartment &&
        isUniquePositionNoInDepartment.id !== clipArt.id
      ) {
        return {
          ...generalConstant.EN.CLIPART.POSITION_NUMBER_ALREADY_EXISTS,
          data: null,
        };
      }
    }

    const updatedClickArt = await clipArt.update(req.body);

    if (!updatedClickArt) {
      return {
        ...generalConstant.EN.CLIPART.UPDATE_CLIPART_SUCCESS,
        data: null,
      };
    } else {
      return {
        ...generalConstant.EN.CLIPART.UPDATE_CLIPART_SUCCESS,
        data: updatedClickArt,
      };
    }
  } catch (error) {
    throw error;
  }
};

const deleteClipArt = async (req) => {
  try {
    const clipArt = await clipArtModel.findByPk(+req.params.id);

    if (!clipArt) {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_NOT_FOUND,
        data: null,
      };
    }
    const deleteClipArt = await clipArt.destroy();
    if (!deleteClipArt) {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_DELETE_FAILURE,
        data: null,
      };
    } else {
      return {
        ...generalConstant.EN.CLIPART.CLIPART_DELETE_SUCCESS,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  create,
  getById,
  findAllClipArt,
  update,
  deleteClipArt,
};
