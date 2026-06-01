const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  list,
} = require("../controllers/enquire-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  enquireListValidation,
  enquirePostValidation,
} = require("../../validations/enquire-validation");

router.post("/", enquirePostValidation, create);
router.get("/list", authentication, authorization, enquireListValidation, list);
router.get("/:id", authentication, authorization, idValidation, getById);
router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
