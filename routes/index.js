var express = require('express');
const { indexhomepage, indexlogin, indexregister ,indexprofile, indexcreatBlog, indexblogDescription} = require('../controllers/indexController');
const { isloggedin } = require('../util/middelware');
var router = express.Router();

/* GET home page. */
router.get('/', indexhomepage);

router.get('/login', indexlogin)

router.get('/profile',isloggedin, indexprofile)

router.get('/register', indexregister);

router.get('/blogdescription/:id', indexblogDescription);

router.get('/createblog', indexcreatBlog);

module.exports = router;
