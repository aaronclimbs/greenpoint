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

  router
  .route("/month/:id/:month/:year")
  .get(logsController.groupByEventMonth)
  .put(logsController.update)
  .delete(logsController.remove);

  router
  .route("/monthUserStats/:month/:year")
  .get(logsController.groupByUserStatsMonth)
  .put(logsController.update)
  .delete(logsController.remove);

  router
  .route("/monthCatStats/:month/:year")
  .get(logsController.groupByUserCatStatsMonth)

  

module.exports = router;