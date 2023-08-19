const express = require('express')
const cors = require('cors')
const app = express()
const port = 7777
const configureDB = require('./config/database')
const authenticateUser=require('./app/middlewares/authenticateUser')
const userCltr = require('./app/controllers/userCltr')
const categoryCltr=require('./app/controllers/categoryCltr')
const expenseCltr=require('./app/controllers/expenseCltr')
require('dotenv').config()


// connect to DB
configureDB()



// Middlewares-Application level
app.use(cors())
app.use(express.json())


//user(register-login-delte)
app.get('/api/users',userCltr.show)
app.post('/api/users', userCltr.register)
app.post('/api/users/login', userCltr.login)
app.delete('/api/users/delete/:id',authenticateUser,userCltr.destroy)

//category(CRUD)
app.post('/api/categories',authenticateUser,categoryCltr.create)
app.get('/api/categories',authenticateUser,categoryCltr.list)
app.delete('/api/categories/:id',authenticateUser,categoryCltr.destroy)

//expense(CRUD)
app.get('/api/expenses',authenticateUser,expenseCltr.show)
app.get('/api/expenses/soft',authenticateUser,expenseCltr.list)
app.get('/api/expenses/:id',authenticateUser,expenseCltr.showOne)
app.post('/api/expenses',authenticateUser,expenseCltr.create)
app.put('/api/expenses/:id',authenticateUser,expenseCltr.updateExpense)
app.put('/api/expenses/undo/:id',authenticateUser,expenseCltr.updateUndo)
app.delete('/api/expenses/softdelete/:id',authenticateUser,expenseCltr.destroy)
app.delete('/api/expenses/:id',authenticateUser,expenseCltr.completeDestroy)
app.delete('/api/expenses',authenticateUser,expenseCltr.deleteMany)


// end
app.listen(port, () => {
    console.log('server is running at port', port)
})