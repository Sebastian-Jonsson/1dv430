const router = require('express').Router()
const bcrypt = require('bcryptjs')
const config = require('config')
const jwt = require('jsonwebtoken')
let auth = require('../../middleware/auth').auth
let adminAuth = require('../../middleware/auth').adminAuth


const User = require('../../models/User')
const Item = require('../../models/Item')

// @route POST api.auth
// @desc Auth user
// @access Public
router.post('/', (req, res) => {
    const { email, password } = req.body

    if(!email || !password) {
        return res.status(400).json({msg: 'Please enter all fields'})
    }

    User.findOne({ email })
    .then(user => { 
        if(!user) return res.status(400).json({ msg: 'User does not exist'})
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({msg: 'Invalid Credentials'})

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
                                    email: user.email,
                                    cart: user.cart
                                }
                            })
                        }
                    )
                })
    })
    
})

// @route GET api/auth/user
// @desc Get user data
// @access Private
router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password') // Dont want to return password
        .then(user => res.json(user))
})

// @route GET api/auth/addToCart
// @desc Adds product to Users cart. Not Yet Implemented.
// @access Private
router.get('/addToCart', auth, (req, res) => {
    User.findById(req.user.id, (err, userInfo) => {
        console.log('BACKEND addToCart', + req.user.id)
        let duplicate = false

        userInfo.cart.forEach((item) => {
            if(item.id === req.query.productId) {
                duplicate = true
            }
            
            if (duplicate) {
                User.findOneAndUpdate(
                    { _id: req.user._id, 'cart.id': req.query.productId },
                    { $inc: {'cart.$.quantity': 1} },
                    { new: true },
                    (err, userInfo) => {
                        if(err) return res.json({ success: false, err })
                        res.status(200).json(useInfo.cart)
                    }
                    
                    )
                }
                else {
                    User.findOneAndUpdate(
                        { _id: req.user._id },
                        {
                            $push: {
                                cart: {
                                    id: req.query.productId,
                                    quantity: 1,
                                    date: Date.now()
                                }
                            }
                        },
                        { new: true },
                        (err, userInfo) => {
                            if(err) return res.json({ success: false, err})
                        res.status(200).json(userInfo.cart)
                    }
                )
            }
        })
    })
})

module.exports = router