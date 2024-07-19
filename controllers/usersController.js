// sbase pahle passport ko require karo
const passport = require("passport");
// usermodel kpo require karo
const userModel = require("../Models/userModel");

const localStrategy = require("passport-local");
const blogModel = require("../Models/blogModel");
const imagekit = require("../util/imagekit");
const commentsModel = require("../Models/commentsModel");
passport.use(new localStrategy(userModel.authenticate()));

exports.homepage = function (req, res, next) {
  res.render("index");
};

exports.signuppage = (req, res, next) => {
  const newUser = new userModel({
    username: req.body.username,
    email: req.body.email,
    fullname: req.body.fullname,
  });

  userModel.register(newUser, req.body.password).then((u) => {
    passport.authenticate("local")(req, res, () => {
      res.redirect("/login");
    });
  });
};

exports.signinpage = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

exports.logout = (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
};

exports.creatBlogs = async (req, res, next) => {
  // console.log(req.body);

  const newBlog = new blogModel({
    title: req.body.title,
    description: req.body.description,
    blogImage: req.body.blogImage,
    createdBy: req.user._id,
  });

  await newBlog.save();

  await req.user.blogs.push(newBlog._id);

  await req.user.save();

  res.redirect("/profile");
};

exports.uploadimg = async (req, res, next) => {

  const user = await userModel.findById(req.params.id);

  if (!user) {
    res.send("user not found");
  }

  const { fileId, url, thumbnailUrl } = await imagekit.upload({
    file: req.files.avatar.data,
    fileName: req.files.avatar.name,
  });

  if (!url) {
    res.send("their is some error while genrating url through imagekit");
  }
  user.profile = url;

  await user.save();
  console.log(user);
  res.render("profile", { user });
};


exports.blogupdate = async(req, res ,next)=>{
  const updateblog = await blogModel.findByIdAndUpdate({_id:req.params.id}, {
    title: req.body.title,
    description: req.body.description,
    blogImage: req.body.blogImage
  })
  await updateblog.save()
  res.redirect("/profile")
}

exports.commentkaro = async(req, res, next)=>{

  const newComment = await new commentsModel({
    commentText: req.body.comment,
    postedBy: req.user._id,
    blogId:req.params.id
  })
  await newComment.save()
  const currentblog = await blogModel.findByIdAndUpdate(req.params.id,{
    $push:{comments:newComment._id}
  })
  await currentblog.save()

  res.redirect(`/blogdescription/${req.params.id}`)
}