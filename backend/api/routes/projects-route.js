const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  list,
  update,
} = require("../controllers/projects-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  projectsListValidation,
  projectsPostValidation,
  projectsPutValidation,
} = require("../../validations/projects-validation");

router.post("/", authentication, authorization, projectsPostValidation, create);
router.get("/list", projectsListValidation, list);
router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  projectsPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
