const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  list,
  update,
} = require("../controllers/project-category-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  projectCategoryListValidation,
  projectCategoryPostValidation,
  projectCategoryPutValidation,
} = require("../../validations/project-category-validation");

router.post(
  "/",
  authentication,
  authorization,
  projectCategoryPostValidation,
  create,
);
router.get("/list", projectCategoryListValidation, list);
router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  projectCategoryPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
