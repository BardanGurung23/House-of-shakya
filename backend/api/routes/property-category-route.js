const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  list,
  update,
} = require("../controllers/property-category-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  propertyCategoryListValidation,
  propertyCategoryPostValidation,
  propertyCategoryPutValidation,
} = require("../../validations/property-category-validation");

router.post(
  "/",
  authentication,
  authorization,
  propertyCategoryPostValidation,
  create,
);
router.get("/list", propertyCategoryListValidation, list);
router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  propertyCategoryPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
