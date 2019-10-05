const router = require("express").Router();
const actionsController = require("../../controllers/userEventsController");


router.route("/userEvents")
  .get(userEventsController.findAll)
  .post(userEventsController.create);


router
  .route("/userEvents/:id")
  .get(userEventsController.findById)
  .put(userEventsController.update)
  .delete(userEventsController.remove);

module.exports = router;
