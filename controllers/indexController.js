const blogModel = require("../Models/blogModel");
const userModel = require("../Models/userModel");

exports.indexhomepage = async function(req, res, next) {

  const allBlogs = await blogModel.find()
  console.log(allBlogs);
    res.render('index', {allBlogs});
  }

  exports.indexlogin = function(req, res, next) {
    res.render('login', { title: 'Express' });
  }

  exports.indexregister = function(req, res, next) {
    res.render('register', { title: 'Express' });
  }

  exports.indexprofile = async function(req, res, next){

    const user = await userModel.findById(req.user._id).populate("blogs")

    res.render("profile", {user})
  }
  exports.indexcreatBlog =async function(req, res, next){
    res.render("CreateBlog" )

  }

  exports.indexblogDescription = async (req, res, next)=>{
    res.render("blogdescription" )

  }