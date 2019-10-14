const router = require("express").Router();
const bcrypt = require("bcrypt");
// require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User } = require("../../models/");
const auth = require("../../middleware/auth");
const axios = require("axios");

// signup user
router.post("/", async (req, res) => {
  const { name, email, password, zipcode } = req.body;
  console.log(JSON.stringify(req.body));
  let gpsCoords = "";

  if (zipcode) {
    // get gps coords
    gpsCoords = await axios
      .get(
        `https://www.zipcodeapi.com/rest/${process.env.API_ZIPCODE}/info.json/${zipcode}/degrees`
      )
      .then(response => {
        return response.data;
      })
      .catch(err => console.log(err));
  }

  // basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (user) return res.status(400).json({ msg: "User already exists" });

    const newUser = new User({
      name,
      email,
      password,
      location: {
        lat: gpsCoords.lat,
        lng: gpsCoords.lng
      }
    });

    // create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser.save().then(user => {
          jwt.sign(
            { id: user.id },
            process.env.jwtSecret,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user._id,
                  name: user.name,
                  email: user.email,
                  location: {
                    lat: user.location.lat,
                    lng: user.location.lng
                  }
                }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
