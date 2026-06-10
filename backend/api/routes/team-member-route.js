const router = require("express").Router();
const {
  create,
  deleteOne,
  getById,
  list,
  update,
  updateOrder,
} = require("../controllers/team-member-controller");
const {
  authentication,
  authorization,
} = require("../../middlewares/auth-middleware");
const { idValidation } = require("../../validations/common-validation");
const {
  teamMemberListValidation,
  teamMemberOrderValidation,
  teamMemberPostValidation,
  teamMemberPutValidation,
} = require("../../validations/team-member-validation");

router.post("/", authentication, authorization, teamMemberPostValidation, create);
router.get("/list", teamMemberListValidation, list);
router.put(
  "/order",
  authentication,
  authorization,
  teamMemberOrderValidation,
  updateOrder,
);
router.get("/:id", idValidation, getById);
router.put(
  "/:id",
  authentication,
  authorization,
  idValidation,
  teamMemberPutValidation,
  update,
);
router.delete("/:id", authentication, authorization, idValidation, deleteOne);

module.exports = router;
