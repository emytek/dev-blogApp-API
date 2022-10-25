const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPass,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN  
// router.post("/login", async (req, res) => {
//     try {
//       const user = await User.findOne({ username: req.body.username });
    //   !user && res.status(400).json("Wrong username!");
    // if(!user) {
    //     return res.status(400).json("Wrong username!");
    // }
  
      //const validated = await bcrypt.compare(req.body.password, user.password);
      //the user.password is from the mongodb
    //   !validated && res.status(400).json("Wrong password!");
  
//     const { password, ...others } = user._doc;
//       res.status(200).json(others);
//     } catch (err) {
//       res.status(500).json(err);
//     }
// });

//@desc LOGIN
//@route /api/users/login
//@access Public
router.post("/login", async(req, res)  => {
    const { username, password } = req.body
  
    const user = await User.findOne({ username })
  
    // Check user and passwords match
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
    })
  } else {
    res.status(401).json("Wrong Credentials!")
  }
})






module.exports = router;
