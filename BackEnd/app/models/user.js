const mongoose=require('mongoose')
const isEmail=require('validator/lib/isEmail')
const {Schema}=mongoose

//create Schema
const userSchema=new Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return isEmail(value)
            },
            message:function(){
                return ('Invalid Email')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        maxlength:128
    },
    budget:{
        type:Number,
        required:true
    }
},{timestamps:true})

//create Model
const User=mongoose.model('User',userSchema)

module.exports=User