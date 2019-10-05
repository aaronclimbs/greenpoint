const router = require("express").Router();
const actionsController = require("../../controllers/actionsController");

// Matches with "/api/actions"
router.route("/")
  .get(actionsController.findAll)
  .post(actionsController.create);


// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(actionsController.findById)
  .put(actionsController.update)
  .delete(actionsController.remove);

module.exports = router;
