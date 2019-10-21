const router = require("express").Router();
require("dotenv").config();
const axios = require("axios");


router.get("/recycle/:query", (req, res) => {
  const headers = {
    "Content-Type": "application/json"
  };
  const queryURL =
    "https://api.earth911.com/earth911.searchMaterials?query=" +
    req.params.query +
    "&api_key=" +
    process.env.API_Earth911 +
    "&max_results=10";

  axios
    .get(queryURL, { headers: headers })
    .then(response => {
      console.log(response.data);
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

router.get("/locations/:material_id", (req, res) => {
  const queryURL =
    "http://api.earth911.com/earth911.searchLocations?latitude=38.9072&longitude=-77.0369&material_id=" +
    req.params.material_id +
    "&api_key=" +
    process.env.API_Earth911 +
    "&max_results=10";

  axios
    .get(queryURL)
    .then(function(response) {
      console.log(
        "Earth911 data is:" +
          JSON.stringify(response.data) +
          "************************** Our item is: "
      );
      //   recyclingLocations
      res.json(response.data);
    })
    .catch(err => console.log(err));
});

router.get("/zip-to-gps/:zipcode", (req, res) => {
  const zip = req.params.zipcode;
  axios
    .get(
      `https://www.zipcodeapi.com/rest/${process.env.API_ZIPCODE}/info.json/${zip}/degrees`
    )
    .then(response => res.json(response.data))
    .catch(err => console.log(err));
});



module.exports = router;
