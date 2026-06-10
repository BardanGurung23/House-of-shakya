const { Op } = require("sequelize");
const generalConstant = require("../../constants/general-constant");
const { sequelize, teamMemberModel } = require("../../models");
const paginate = require("../../utils/paginate");
const slugGenerator = require("../../utils/slugify");

const normalizeBody = (body) => ({
  ...body,
  department: body.department || null,
  bio: body.bio || null,
  image: body.image || null,
  email: body.email || null,
  phone: body.phone || null,
  linkedinUrl: body.linkedinUrl || null,
  sortOrder: body.sortOrder ?? 0,
  isFeatured: body.isFeatured ?? false,
  isActive: body.isActive ?? true,
});

const create = async (req) => {
  try {
    const body = normalizeBody(req.body);
    body.slug = slugGenerator(body.name);

    const result = await teamMemberModel.create(body);

    if (!result) {
      return {
        ...generalConstant.EN.TEAM_MEMBER.CREATE_TEAM_MEMBER_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TEAM_MEMBER.CREATE_TEAM_MEMBER_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const list = async (req) => {
  try {
    const { limit, page, name, designation, department, isActive, isFeatured } =
      req.query;
    const filters = {};

    if (name) {
      filters.name = {
        [Op.like]: `%${name}%`,
      };
    }

    if (designation) {
      filters.designation = {
        [Op.like]: `%${designation}%`,
      };
    }

    if (department) {
      filters.department = {
        [Op.like]: `%${department}%`,
      };
    }

    if (isActive !== undefined) {
      filters.isActive = isActive;
    }

    if (isFeatured !== undefined) {
      filters.isFeatured = isFeatured;
    }

    const result = await paginate(teamMemberModel, {
      limit,
      page,
      filters,
      order: [
        ["sortOrder", "ASC"],
        ["id", "ASC"],
      ],
    });

    if (!result) {
      return {
        ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_LIST_FAILURE,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_LIST_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const getById = async (req) => {
  try {
    const result = await teamMemberModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_FOUND,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const update = async (req) => {
  try {
    const result = await teamMemberModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_UPDATE_FAILURE,
        data: null,
      };
    }

    const body = normalizeBody(req.body);

    if (body.name) {
      body.slug = slugGenerator(body.name);
    }

    await result.update(body);

    return {
      ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_UPDATE_SUCCESS,
      data: result,
    };
  } catch (error) {
    throw error;
  }
};

const updateOrder = async (req) => {
  const transaction = await sequelize.transaction();

  try {
    await Promise.all(
      req.body.map(({ id, sortOrder }) =>
        teamMemberModel.update(
          { sortOrder },
          {
            where: { id },
            transaction,
          },
        ),
      ),
    );

    await transaction.commit();

    return {
      ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_UPDATE_SUCCESS,
      data: null,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const deleteById = async (req) => {
  try {
    const result = await teamMemberModel.findByPk(+req.params.id);

    if (!result) {
      return {
        ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_DELETE_FAILURE,
        data: null,
      };
    }

    await result.destroy();

    return {
      ...generalConstant.EN.TEAM_MEMBER.TEAM_MEMBER_DELETE_SUCCESS,
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
  updateOrder,
  deleteById,
};
