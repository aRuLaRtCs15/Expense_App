const Category=require('../models/category')
const Expense=require('../models/expense')

const categoryCltr={}

// GET CATEGORIES

categoryCltr.list=async(req,res)=>{
    try{
        const categories=await Category.find()
        res.json(categories)
    }catch(e){
        res.json(e)
    }
}

// CREATE CATEGORIES

categoryCltr.create=async(req,res)=>{
    try{
     const{body}=req
     const category=await Category.create({...body,userId:req.user.id})
     res.json(category)
    }catch(e){
        res.json(e)
    }
}

// DELETE CATEGORIES

categoryCltr.destroy=async(req,res)=>{
    try{
        const{id}=req.params
        const category= Category.findByIdAndDelete(id)
        const expense= Expense.deleteMany({categoryId:id})
        const result=await Promise.all([category,expense])
        res.json(result[0])

    }catch(e){
        res.json(e)
    }}


module.exports=categoryCltr