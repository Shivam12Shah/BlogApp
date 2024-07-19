var express = require('express');
const { indexhomepage, indexlogin, indexregister ,indexprofile, indexcreatBlog, indexblogDescription ,updateBlog ,deletblog} = require('../controllers/indexController');
const { isloggedin } = require('../util/middelware');
var router = express.Router();

/* GET home page. */
router.get('/', indexhomepage);

router.get('/login', indexlogin)

router.get('/profile',isloggedin, indexprofile)

router.get('/register', indexregister);

router.get('/update/:id', isloggedin,updateBlog);

router.get('/blogdescription/:id',isloggedin, indexblogDescription);

router.get('/createblog', isloggedin,indexcreatBlog);

router.get("/delete/:id", isloggedin, deletblog)

module.exports = router;
