const mongoose=require('mongoose')
const configureDB=async()=>{
try{
  const db=await mongoose.connect('mongodb://127.0.0.1:27017/expense_app')
  console.log('server is connectred to DB')
}catch(e){
    console.log('error occured when connected to database')
}
}


module.exports=configureDB