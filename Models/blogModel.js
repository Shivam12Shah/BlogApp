// BLog title
// BLog description 
// Blog Image
// date or time
// created by


const mongoose = require("mongoose")

const blogSchema = mongoose.Schema({
    title:String,
    description :String,
    blogImage : String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"comment"
        }
    ]


}, {timestamps:true})

module.exports = mongoose.model("blog", blogSchema)