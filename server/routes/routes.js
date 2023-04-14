const express = require("express");
const router = express.Router();
const User = require("./../models/users");
const multer = require("multer");

// image upload
let storage = multer.diskStorage({
  destination: "assets/images/",
  filename: (req, file, cb) => {
    // cb(null, Date.now(+file+originalname))
    cb(null, file.originalname);
  },
});
// console.log("storage", storage);
let upload = multer({
  storage: storage,
});

// insert an user to db
router.post("/add", upload.single("image"), (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      image: req.file.filename,
    });
    console.log("user", req.body);
    user
      .save(user)
      .then(res.redirect("/"))
      .catch((err) => {
        if (err) {
          res.json({ message: err.message, type: "danger" });
        } else {
          req.session.message = {
            type: "success", 
            message: "User Added Successfully",
          };
        }
      });
  } catch (error) {
    console.log(error.message);
  }
});

// Get All User Routes
router.get("/", async(req, res) => {
  User.find({},).then((users,err)=>{
    // console.log(err,users);
    if(err){
        res.json({ message: err.message });
    }else{
        res.render('index', {
            title: 'Home Page',
            users: users,
        })
    }
  })
});


router.get("/add", async (req, res) => {
  res.render("add_users", { title: "Add users" });
});

// edit an user
router.get("/edit/:id", async (req, res) => {
  let id = req.params.id;
  // User.findById(id).then((user, err) => {
  //   console.log(user, err);

  //   if(err){
  //     res.redirect('/')
  //   }else{
  //     if(user == null){
  //       res.redirect('/')
  //     }else{
  //       res.render('edit_users', { title: "Edit user", user: user})
  //     }
  //   }
  // })
  let user=await  User.findOne({_id:id})
  // console.log(user)
  user.image="https://images.unsplash.com/photo-1673766610671-11229c84f86d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=80"
  // console.log(user)

  res.render('edit_users', { title: "Edit user", user: user})
  // res.render('edit_users', { title: "Edit user"})

  router.post('/update/:id', upload.single("image"), async(req,res) => {
    let user = await User.findByIdAndUpdate(id, {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      // image: new_image
    })
    res.redirect('/')
  })
})

router.get('/delete/:id', async (req,res) => {
  let id = req.params.id;
  let user = await User.findByIdAndRemove(id, {
    
  })
  res.redirect('/')
})

module.exports = router;

// (err) => {
//     if (err) {
//       res.json({ message: err.message, type: "danger" });
//     } else {
//       req.session.message = {
//         type: "success",
//         message: "User Added Successfully",
//       };
//       res.redirect("/");
//     }
//   }
