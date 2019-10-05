const router = require("express").Router();
const logsController = require("../../controllers/logsController");


router.route("/logs")
  .get(logsController.findAll)
  .post(logsController.create);


router
  .route("/logs/:id")
  .get(logsController.findById)
  .put(logsController.update)
  .delete(logsController.remove);

module.exports = router;
