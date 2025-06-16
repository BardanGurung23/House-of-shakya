const {
  employeeModel,
  timeTableHeaderModel,
  timeTableModel,
  sequelize,
} = require("../../models");
const generalConstant = require("../../constants/general-constant");

// Time Table Header

const create = async (req) => {
  const transaction = await sequelize.transaction(); // Start a transaction
  try {
    const { timeTable, ...rest } = req.body;

    // Check if the employee exists
    const isEmployee = await employeeModel.findByPk(req.body.employeeId);
    if (!isEmployee) {
      return {
        ...generalConstant.EN.EMPLOYEE.EMPLOYEE_NOT_FOUND,
        data: null,
      };
    }

    // Create time table header
    const timeTableHeader = await timeTableHeaderModel.create(rest, {
      transaction,
    });
    if (!timeTableHeader) {
      await transaction.rollback();
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER
          .CREATE_TIME_TABLE_HEADER_FAILURE,
        data: null,
      };
    }

    // Create timetable entries if provided
    if (Array.isArray(timeTable) && timeTable.length > 0) {
      const timeTableEntries = timeTable.map((entry) => ({
        ...entry,
        timeTableHeaderId: timeTableHeader.id,
      }));

      const createdEntries = await timeTableModel.bulkCreate(timeTableEntries, {
        transaction,
      });
      if (!createdEntries) {
        await transaction.rollback();
        return {
          ...generalConstant.EN.TIME_TABLE.CREATE_TIME_TABLE_FAILURE,
          data: null,
        };
      }
    }

    // Commit the transaction
    await transaction.commit();

    return {
      ...generalConstant.EN.TIME_TABLE.CREATE_TIME_TABLE_SUCCESS,
      data: timeTableHeader,
    };
  } catch (error) {
    await transaction.rollback();
    throw error;
  }
};

const getTimeTable = async (req) => {
  try {
    const timeTableHeader = await timeTableHeaderModel.findByPk(
      +req.params.id,
      {
        attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude fields from the main model
        include: [
          {
            model: timeTableModel,
            attributes: { exclude: ["createdAt", "updatedAt"] }, // Exclude fields from the included model
          },
        ],
        order: [["TimeTables", "date", "ASC"]], // Correctly apply sorting for the associated model
        logging: console.log, // Log the generated query for debugging
      },
    );

    if (!timeTableHeader) {
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_NOT_FOUND,
        data: null,
      };
    }

    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_FOUND,
      data: timeTableHeader,
    };
  } catch (error) {
    throw error;
  }
};

const updateHeaderAndTables = async (req) => {
  const transaction = await sequelize.transaction();
  try {
    const { timeTable, ...rest } = req.body;

    // Check if the timetable header exists
    const isTimeTableHeader = await timeTableHeaderModel.findByPk(
      +req.params.id,
      { transaction },
    );
    if (!isTimeTableHeader) {
      await transaction.rollback(); // Rollback transaction
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_NOT_FOUND,
        data: null,
      };
    }

    // Update timetable header
    await isTimeTableHeader.update(rest, { transaction });

    // Update timetable entries
    if (Array.isArray(timeTable) && timeTable.length > 0) {
      const existingEntries = await timeTableModel.findAll({
        where: { timeTableHeaderId: +req.params.id },
        attributes: ["id"], // Only fetch IDs
        transaction,
      });

      const existingIds = new Set(existingEntries.map((entry) => entry.id));
      const incomingIds = new Set(
        timeTable.map((entry) => entry.id).filter((id) => id),
      );

      // Entries to update
      const entriesToUpdate = timeTable.filter(
        (entry) => entry.id && existingIds.has(entry.id),
      );

      // Entries to create
      const entriesToCreate = timeTable.filter((entry) => !entry.id);

      // IDs to delete
      const idsToDelete = [...existingIds].filter((id) => !incomingIds.has(id));

      // Bulk update
      if (entriesToUpdate.length > 0) {
        await Promise.all(
          entriesToUpdate.map((entry) =>
            timeTableModel.update(entry, {
              where: { id: entry.id },
              transaction,
            }),
          ),
        );
      }

      // Bulk create
      if (entriesToCreate.length > 0) {
        const newEntries = entriesToCreate.map((entry) => ({
          ...entry,
          timeTableHeaderId: +req.params.id,
        }));
        await timeTableModel.bulkCreate(newEntries, { transaction });
      }

      // Bulk delete
      if (idsToDelete.length > 0) {
        await timeTableModel.destroy({
          where: { id: idsToDelete },
          transaction,
        });
      }
    }

    // Commit the transaction
    await transaction.commit();

    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.UPDATE_TIME_TABLE_HEADER_SUCCESS,
      data: isTimeTableHeader,
    };
  } catch (error) {
    await transaction.rollback(); // Rollback on error
    throw error;
  }
};

const deleteTimeTableHeader = async (req) => {
  try {
    const isTimeTableHeader = await timeTableHeaderModel.findByPk(
      +req.params.id,
      {
        include: [
          {
            model: timeTableModel,
          },
        ],
      },
    );
    if (!isTimeTableHeader) {
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_NOT_FOUND,
        data: null,
      };
    }

    if (isTimeTableHeader?.TimeTables.length > 0) {
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_IS_IN_USE,
        data: null,
      };
    }
    const deleted = await isTimeTableHeader.destroy();
    if (deleted) {
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER
          .TIME_TABLE_HEADER_DELETE_SUCCESS,
        data: null,
      };
    } else {
      return {
        ...generalConstant.EN.TIME_TABLE_HEADER
          .TIME_TABLE_HEADER_DELETE_FAILURE,
        data: null,
      };
    }
  } catch (error) {
    throw error;
  }
};

const updateTimeTableHeaderOnly = async (req) => {
  const isTimeTableHeader = await timeTableHeaderModel.findByPk(+req.params.id);
  if (!isTimeTableHeader) {
    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_NOT_FOUND,
      data: null,
    };
  }
  const updatedTimeTableHeader = await isTimeTableHeader.update(req.body);
  if (!updatedTimeTableHeader) {
    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.UPDATE_TIME_TABLE_HEADER_FAILURE,
      data: null,
    };
  } else {
    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.UPDATE_TIME_TABLE_HEADER_SUCCESS,
      data: updatedTimeTableHeader,
    };
  }
};

// Time Table

const createSingleTimeTable = async (req) => {
  const isTimeTableHeader = await timeTableHeaderModel.findByPk(
    req.body.timeTableHeaderId,
  );
  if (!isTimeTableHeader) {
    return {
      ...generalConstant.EN.TIME_TABLE_HEADER.TIME_TABLE_HEADER_NOT_FOUND,
      data: null,
    };
  }
  const createdTimeTable = await timeTableModel.create({
    ...req.body,
    timeTableHeaderId: req.body.timeTableHeaderId,
  });
  if (!createdTimeTable) {
    return {
      ...generalConstant.EN.TIME_TABLE.CREATE_TIME_TABLE_FAILURE,
      data: null,
    };
  } else {
    return {
      ...generalConstant.EN.TIME_TABLE.CREATE_TIME_TABLE_SUCCESS,
      data: createdTimeTable,
    };
  }
};

const updateSingleTimeTable = async (req) => {
  const isTimeTable = await timeTableModel.findByPk(+req.params.id);
  if (!isTimeTable) {
    return {
      ...generalConstant.EN.TIME_TABLE.TIME_TABLE_NOT_FOUND,
      data: null,
    };
  }
  const updatedTimeTable = await isTimeTable.update(req.body);
  if (!updatedTimeTable) {
    return {
      ...generalConstant.EN.TIME_TABLE.UPDATE_TIME_TABLE_FAILURE,
      data: null,
    };
  } else {
    return {
      ...generalConstant.EN.TIME_TABLE.UPDATE_TIME_TABLE_SUCCESS,
      data: updatedTimeTable,
    };
  }
};

const deleteSingleTimeTable = async (req) => {
  const isTimeTable = await timeTableModel.findByPk(+req.params.id);
  if (!isTimeTable) {
    return {
      ...generalConstant.EN.TIME_TABLE.TIME_TABLE_NOT_FOUND,
      data: null,
    };
  }
  const deletedTimeTable = await isTimeTable.destroy();
  if (!deletedTimeTable) {
    return {
      ...generalConstant.EN.TIME_TABLE.TIME_TABLE_DELETE_FAILURE,
      data: null,
    };
  } else {
    return {
      ...generalConstant.EN.TIME_TABLE.TIME_TABLE_DELETE_SUCCESS,
      data: null,
    };
  }
};

module.exports = {
  //time table header
  create,
  getTimeTable,
  updateHeaderAndTables,
  deleteTimeTableHeader,
  updateTimeTableHeaderOnly,

  //time table

  createSingleTimeTable,
  updateSingleTimeTable,
  deleteSingleTimeTable,
};
