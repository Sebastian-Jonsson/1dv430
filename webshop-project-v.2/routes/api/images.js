const router = require('express').Router()
const adminAuth = require('../../middleware/auth').adminAuth

// @route POST api.images
// @desc Uploads an image to the server.
// @access Private
router.post('/', adminAuth, (req, res) => {
    if(req.files === null) {
        return res.status(400).json({ msg: 'No file uploaded' })
    }

    const file = req.files.image

    file.mv(`./client/public/uploads/${file.name}`, err => {
        if(err) {
            console.error(err)
            return res.status(500).send(err)
        }

        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` })
    })
})

module.exports = router

