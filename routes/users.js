var express = require('express');
const { homepage, signuppage,signinpage,logout,creatBlogs, uploadimg } = require('../controllers/usersController');
const { isloggedin } = require('../util/middelware');
var router = express.Router();



/* GET users listing. */
router.get('/', homepage);

router.post("/register", signuppage)

router.post("/login" ,signinpage)

router.get("/logout" ,logout)


router.post("/createBlog",isloggedin ,creatBlogs)

router.post("/uploadimg/:id" , isloggedin, uploadimg)



module.exports = router;
