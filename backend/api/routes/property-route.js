const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  getBySlug,
  list,
  update,
} = require("../controllers/property-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  propertyListValidation,
  propertyPostValidation,
  propertyPutValidation,
} = require("../../validations/property-validation");

router.post("/", authentication, authorization, propertyPostValidation, create);
router.get("/list", propertyListValidation, list);
router.get("/slug/:slug", getBySlug);
router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  propertyPutValidation,
  update,
);

router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
