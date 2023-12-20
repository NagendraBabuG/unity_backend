const express = require("express");
const router = express.Router();

const {signup, login} = require('../controllers/auth')


router.post('/signup', signup)

router.post('/login', login)


// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   if (!email || !password)
//     return res
//       .json({ error: "Please make sure to enter all fields." })
//       .status(400);

//   await User.findOne({ email }).then((user) => {
//     if (!user)
//       return res.status(400).json({
//         msg: "Invalid Credentials. Please check again.",
//       });

//     bcrypt.compare(password, user.password).then((isMatch) => {
//       if (!isMatch)
//         return res
//           .status(400)
//           .json({ error: "Invalid Credentials. Please check again." });

//       jwt.sign({ id: user._id }, process.env.JWT_SECRET, (err, token) => {
//         if (err) throw err;

//         res.json({
//           token: token,
//           user: {
//             id: user._id,
//             username: user.username,
//             email: user.email,
//             avatar: user.avatar,
//             blogs: user.blogs,
//             isAdmin: user.isAdmin
//           },
//         });
//       });
//     });
//   });
// });

// router.post("/tokenIsValid", async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.id);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



// router.post("/register", async (req, res) => {
//   try {
//     const { username, name, email, password, avatar, socialMedia, isAdmin } = req.body;
//     if (!username || !email || !password)
//       return res.status(400).json({ error: "Please fill all the fields." });
//     const result = await User.findOne({
//       $or: [{ email: email }, { username: username }],
//     });

//     if (result) {
//       res
//         .json({
//           msg:
//             "User already exists !!!.",
//         })
//         .status(400);
//     } else {
//       const newUser = new User({
//         username,
//         name,
//         email,
//         password,
//         avatar,
//         socialMedia,
//         isAdmin
//       });
//       bcrypt.genSalt(10, (err, salt) => {
//         bcrypt.hash(newUser.password, salt, (error, hash) => {
//           if (error) throw error;

//           newUser.password = hash;

//           newUser.save().then((user) => {
//             res.json({ msg: "User registered." }).status(200);
//           });
//         });
//       });
//     }
//   } catch (error) {
//     res.json({ error: "Error " }).status(501);
//   }
//});


module.exports = router;
