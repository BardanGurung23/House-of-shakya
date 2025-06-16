const router = require("express").Router();

const {
  create,
  getById,
  list,
  update,
  remove,
} = require("../controllers/contact-us-controller");

const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");

const {
  contactPostValidation,
  contactPutValidation,
} = require("../../validations/contact-us-validation");

const {
  paginationValidation,
  idValidation,
  slugValidation,
} = require("../../validations/common-validation");

router.post(
  "/",
  authentication,
  // authorization,
  contactPostValidation,
  create,
);

router.get("/list", paginationValidation, list);

router.get("/:id", idValidation, getById);

router.put(
  "/:id",
  authentication,
  // authorization,
  idValidation,
  contactPutValidation,
  update,
);

router.delete(
  "/:id",
  authentication,
  // authorization,
  remove,
);

module.exports = router;
