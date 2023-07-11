const jwt = require('jsonwebtoken')
require('dotenv').config()

const authenticateUser = async (req, res, next) => {
    const token = req.headers.authorization
    
    if (token) {
        const token1 = token.split(' ')[1]
        try {
            const tokenData = jwt.verify(token1, process.env.JWT_EXPENSE_TOKEN)
            req.user = {
                id: tokenData.id,
                username: tokenData.username,
                email: tokenData.email
            }
         
            next()
        } catch (e) {
            res.status(401).json(e)
        }
    }
    else {
        res.status(401).json({ error: 'token not found' })
    }
}

module.exports = authenticateUser