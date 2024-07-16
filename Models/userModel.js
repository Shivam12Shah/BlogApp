const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");

const userSchema = mongoose.Schema({
  fullname: String,
  username: String,
  email: String,
  password: String,
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blog",
    },
  ],
  profile:{
    type:String,
    default:"https://cdn.vectorstock.com/i/1000v/26/40/profile-placeholder-image-gray-silhouette-vector-22122640.jpg"
  }
});

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
