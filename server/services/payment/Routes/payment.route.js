const express = require('express')
const router = express.Router()
const PaymentController = require('../Controllers/payment.Controller')

router.post('/purchase',PaymentController.purchase)


module.exports = router