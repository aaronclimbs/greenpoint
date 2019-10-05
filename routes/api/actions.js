const router = require("express").Router();
const actionsController = require("../../controllers/actionsController");


router.route("/")
  .get(actionsController.findAll)
  .post(actionsController.create);



router
  .route("/:id")
  .get(actionsController.findById)
  .put(actionsController.update)
  .delete(actionsController.remove);

module.exports = router;
