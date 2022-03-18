const config = require('config')
const jwt = require('jsonwebtoken')


function auth(req, res, next) {
    const token = req.header('x-auth-token')
    
    if(!token) return res.status(401).json({ msg: 'No Token. Authorization denied'})
    
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        if(req.user.userType === 'basic') {
            next()
        }   
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid'})
    }
}

function adminAuth(req, res, next) {
    const token = req.header('x-auth-token')
    
    if(!token) return res.status(401).json({ msg: 'No Token. Authorization denied'})
    
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded
        if(req.user.userType === 'admin') {
            next()
        }
    } catch(e) {
        res.status(400).json({ msg: 'Token is not valid'})
    }
}

module.exports = { auth, adminAuth }