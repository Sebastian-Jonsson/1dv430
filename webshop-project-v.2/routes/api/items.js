const router = require('express').Router()
const adminAuth = require('../../middleware/auth').adminAuth

const Item = require('../../models/Item')

// @route GET api.items
// @desc GET All Items
// @access Public
router.get('/', (req, res) => {
    Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items))
})

// @route POST api.items
// @desc Create an Item
// @access Private
router.post('/', adminAuth, (req, res) => {
    
    const newItem = new Item({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        price_code: req.body.price_code
    })

    newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(404))
})

// @route DELETE api.items/delete/:id
// @desc Delete an Item
// @access Private
router.delete('/delete/:id', adminAuth, (req, res) => {
    Item.findById(req.params.id)
    .then(item => item.remove()
    .then(() => res.json({ success: true })))
    .catch(err => res.status(404).json({ success: false }))
})

// @route GET api.item
// @desc GET All Item
// @access Public
router.put('/update/:id', adminAuth, (req, res) => {
    Item.findByIdAndUpdate({ _id: req.params.id }, { $set: { 
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        price_code: req.body.price_code
    }}, { new: true })
    .sort({ date: -1 })
    .then(u => { 
        console.log('Updated' + u)
        res.json(u)
        })
    .catch(err => res.status(404))
})

module.exports = router