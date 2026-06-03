const models = require("../../models");
const { Op } = require("sequelize");

async function checkIfMediaPathInUse(mediaPath) {
  const checks = [
    {
      modelKey: "settingModel",
      fields: ["fav_icon", "brandingImage", "brandingFooterImage"],
      name: "Setting",
    },
    {
      modelKey: "socialModel",
      fields: ["fav_icon"],
      name: "Social",
    },

    {
      modelKey: "userModel",
      fields: ["imageUrl"],
      name: "User",
    },
    {
      modelKey: "bannerModel",
      fields: ["video_url"],
      name: "Banner",
    },
    {
      modelKey: "pagesModel",
      fields: ["og_image"],
      name: "Pages",
    },

    {
      modelKey: "bannerItemsModel",
      fields: ["image"],
      name: "BannerItem",
    },
    {
      modelKey: "blogModel",
      fields: ["image"],
      name: "Blog Image",
    },
    {
      modelKey: "projectsModel",
      fields: ["img"],
      name: "Projects",
    },
    {
      modelKey: "propertyMediaModel",
      fields: ["image"],
      name: "Property",
    },
    {
      modelKey: "projectMediaModel",
      fields: ["image"],
      name: "Project",
    },
  ];

  const checksResult = await Promise.all(
    checks.map(async ({ modelKey, fields, name }) => {
      const model = models[modelKey];

      if (!model) {
        return null;
      }

      const searchableFields = fields.filter(
        (field) => model.rawAttributes?.[field],
      );

      if (searchableFields.length === 0) {
        return null;
      }

      const whereClause = {
        [Op.or]: searchableFields.map((field) => ({
          [field]: mediaPath,
        })),
      };

      const result = await model.findOne({ where: whereClause });
      return result ? name : null;
    }),
  );

  const usedInModules = checksResult.filter((module) => module !== null);

  return usedInModules;
}

module.exports = checkIfMediaPathInUse;
