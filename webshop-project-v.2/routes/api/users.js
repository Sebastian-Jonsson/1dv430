const router = require('express').Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
let adminAuth = require('../../middleware/auth').adminAuth

const User = require('../../models/User')

// @route GET api.users
// @desc GET All Users
// @access Public
router.get('/', adminAuth, (req, res) => {
    User.find()
    .sort({ date: -1 })
    .then(users => res.json(users))
    .catch(err => res.status(404).json({ success: false }))
})

// @route POST api.users
// @desc Register new user
// @access Public
router.post('/', (req, res) => {
    const { userType, firstname, surname, email, password } = req.body
            
    if(!userType, !firstname || !surname || !email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    
    User.findOne({ email })
    .then(user => { 
        if(user) return res.status(400).json({ msg: 'User already exists'})

        const newUser = new User({
            userType,
            firstname,
            surname,
            email,
            password
        })
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err
                newUser.password = hash
                newUser.save()
                .then(user => {
                        jwt.sign(
                            { 
                            id: user.id,
                            userType: user.userType
                            },
                            config.get('jwtSecret'),
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err
                                res.json({
                                    token,
                                    user: {
                                        id: user.id,
                                        userType: user.userType,
                                        firstname: user.firstname,
                                        surname: user.surname,
                                        email: user.email
                                    }
                                })
                            }
                        )
                    })
            })
        })
    })
})

module.exports = router