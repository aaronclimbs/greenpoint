const router = require("express").Router();
const bcrypt = require("bcrypt");
// require("dotenv").config();
const jwt = require("jsonwebtoken");
const { User, Book } = require("../../models/");
const auth = require("../../middleware/auth");

// signup user
router.post("/", (req, res) => {
  const { name, email, password } = req.body;

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
      password
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
                user: { id: user._id, name: user.name, email: user.email }
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
