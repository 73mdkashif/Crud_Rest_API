const express = require('express')
const router = express.Router()

const {getAllPoduct , getAllPoductsStatic} = require('../controllers/products')

router.route('/').get(getAllPoduct)
router.route('/static').get(getAllPoductsStatic)

module.exports = router