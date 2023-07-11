const mongoose=require('mongoose')
const{Schema}=mongoose
const expenseSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:String
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    categoryId:{
        type:Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    isDelete:{
        type:Boolean,
        required:true,
        default:false
    }
},{timestamps:true})

const Expense=mongoose.model('Expense',expenseSchema)

module.exports=Expense