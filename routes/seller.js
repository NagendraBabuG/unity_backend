const express = require("express")

const router = express.Router()
const middleware = require('../middleware/auth')

const {createCatalog, getOrders} = require('../controllers/seller')

router.use(middleware)



router.post('/create-catalog', createCatalog)

router.get('/orders', getOrders)

module.exports = router