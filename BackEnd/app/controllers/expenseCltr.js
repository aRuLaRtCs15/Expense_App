const Expense = require('../models/expense')

const expenseCltr = {}

// GET SOFT DELETED EXPENSES

expenseCltr.list = async (req, res) => {
    try {
        const expenses = await Expense.find({ userId:req.user.id , isDelete: true })
        res.json(expenses)
    } catch (e) {
        res.json(e)
    }
}


// GET ORIGINAL EXPENSES

expenseCltr.show = async (req, res) => {
    try {
        const expense = await Expense.find({ userId: req.user.id, isDelete: false })
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e)
    }
}

// GET ONE EXPENSES

expenseCltr.showOne=async(req,res)=>{
    try{
        const{id}=req.params
        const expense=await Expense.findById(id)
        if(expense){
            res.json(expense)
        }else{
            res.json({})
        }
    }catch(e){
        res.json(e.message)
    }
}

// CREATE EXPENSES

expenseCltr.create = async (req, res) => {
    try {
        const { body } = req
        body.userId = req.user.id
        const expense = await Expense.create(body)
        res.json(expense)
    } catch (e) {
        res.json(e)
    }
}

// UPDATE EXPENSES

expenseCltr.updateExpense=async(req,res)=>{
    try{
     const{id}=req.params
     const {body}=req
     const expense=await Expense.findByIdAndUpdate(id,body,{runValidators:true,new:true})
     if(expense){
        res.json(expense)
     }else{
        res.json({})
     }
    }catch(e){
        res.json(e)
    }
}

// RESTORE EXPENSES

expenseCltr.updateUndo = async (req, res) => {
    try {
        const { id } = req.params
        const expense = await Expense.findByIdAndUpdate(id, {$set :{isDelete:false}}, { new: true, runValidators: true })
        if (expense) {
            res.json(expense)
        } else {
            res.json({})
        }
    } catch (e) {
        res.json(e)
    }
}

// SOFT - DELETE EXPENSES

expenseCltr.destroy = async (req, res) => {
    try {
        const { id } = req.params
        const expense = await Expense.findByIdAndUpdate(id, { isDelete: true }, { new: true, runValidators: true })
         if(expense){
            res.json(expense)
         }else{
           res.json({})
         } 
    } catch (e) {
        res.json(e)
    }
}

// COMPLETE DELETE EXPENSES

expenseCltr.completeDestroy = async (req, res) => {
    try {
        const { id } = req.params
        const expense = await Expense.findByIdAndDelete(id, { new: true, runValidators: true })
        if(expense){
            res.json(expense)
        }else{
            res.json({})
        } 
    } catch (e) {
        res.json(e)
    }
}

// DELETE MANY EXPENSES

expenseCltr.deleteMany=async(req,res)=>{
    try{
    const{id}=req.user.id
   const expense=await Expense.deleteMany({isDelete:true},{userId:id})
   res.json(expense)
    }catch(e){
        res.json(e)
    }
}


module.exports = expenseCltr