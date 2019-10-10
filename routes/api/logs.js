const router = require("express").Router();
const logsController = require("../../controllers/logsController");


router.route("/")
  .get(logsController.findAll)
  .post(logsController.create);


router
  .route("/:id")
  .get(logsController.findById)
  .put(logsController.update)
  .delete(logsController.remove);

router
  .route("/:userId")
  .get(logsController.findByUser);

module.exports = router;
