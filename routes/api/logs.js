const router = require("express").Router();
const logsController = require("../../controllers/logsController");


router.route("/")
  .get(logsController.findAll)
  .post(logsController.create);

router
  .route("/:id/:date")
  .get(logsController.findByIdDate)
  .put(logsController.update)
  .delete(logsController.remove);

  router
  .route("/:id")
  .get(logsController.remove)
  .put(logsController.update)
  .delete(logsController.remove);

  router
  .route("/group/:id/:date")
  .get(logsController.groupByEventDate)
  .put(logsController.update)
  .delete(logsController.remove);

<<<<<<< HEAD

=======
  
>>>>>>> c7f5e176a2c907f20e44ddd5321ed061ad5911bf

module.exports = router;