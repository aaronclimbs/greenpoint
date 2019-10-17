const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("../../middleware/auth");

const User = require("../../models/user");

router.post("/", (req, res) => {
  const { email, password } = req.body;

  // basic validation
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields." });
  }

  // check for existing user
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exist." });

    // validate password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        { id: user.id },
        process.env.jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              location: {
                lat: user.location.lat,
                lng: user.location.lng,
                zip: user.location.zip,
                city: user.location.city
              }
            }
          });
        }
      );
    });
  });
});

router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
