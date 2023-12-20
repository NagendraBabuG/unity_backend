const express = require("express")

const router = express.Router()
const middleware = require('../middleware/auth')
const {listOfSellers, createOrder, sellerCatalog} = require('../controllers/buyer')

router.use(middleware)



router.get('/list-of-sellers', listOfSellers)

router.get('/seller-catalog/:seller_id',sellerCatalog)

router.post('/create-order/:seller_id', createOrder)


module.exports = router