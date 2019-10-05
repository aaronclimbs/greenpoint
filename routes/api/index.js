const router = require("express").Router();
const userRoutes = require("./users");
const authRoutes = require("./auth");
const eventRoutes = require("./events");
const logRoutes = require("./logs");

// Book routes
router.use("/users", userRoutes);
router.use("/auth", authRoutes);
router.use("/events", eventRoutes);
router.use("/logs", logRoutes);

module.exports = router;
