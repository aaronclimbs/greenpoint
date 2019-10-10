const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const path = require("path");
require("dotenv").config();

const PORT = process.env.PORT || 3001;

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose
    // .connect("mongodb://localhost/greenpoint_test", {
      
  .connect("mongodb://localhost/greenpoint_test", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
