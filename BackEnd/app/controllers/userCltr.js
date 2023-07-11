const User = require('../models/user')
const Expense=require('../models/expense')
const Category=require('../models/category')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const userCltr = {}

// REGISTER

userCltr.register = async (req, res) => {
    try {
        const { body } = req
        const userObj = new User(body)
        const salt = await bcrypt.genSalt()
        const hashPassword = await bcrypt.hash(userObj.password, salt)
        userObj.password = hashPassword
        const user = await userObj.save()
        res.json(user)
    } catch (e) {
        res.json(e)
    }
}

//LOGIN

userCltr.login = async (req, res) => {
    try {
        const { body } = req
        const user = await User.findOne({ email: body.email })
        if (user) {
            const result = await bcrypt.compare(body.password, user.password)
            if (result) {
                const tokenData = { id: user._id, email: user.email, username: user.username }
                const token = jwt.sign(tokenData, process.env.JWT_EXPENSE_TOKEN)
                res.json(`Bearer ${token}`)
            } else {
                res.json({error:'Invalid Email/Password'})
            }
        }
        else {
            res.json({error:'Invalid Email/Password'})
        }
    } catch (e) {
        res.json(e)
    }
}

userCltr.show=async(req,res)=>{
    try{
        const user=await User.find()
         res.json(user)
    }catch(e){
        res.json(e)
    }
}

//DESTROY

userCltr.destroy=async(req,res)=>{
    try{
        const{id}=req.params
        const user=User.findByIdAndDelete(id)
        const category=Category.deleteMany({userId:req.user.id})
        const expense=Expense.deleteMany({userId:req.user.id})
        const result=await Promise.all([user,category,expense])
        res.json(result[0])
    }catch(e){
        res.json(e)
    }
}

module.exports = userCltr