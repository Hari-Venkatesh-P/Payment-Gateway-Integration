const router = require('express').Router()

const paytmservices = require('../services/paytmservice')

router.post("/initializepayment",paytmservices.initiatePaymentRequest)

module.exports = router;
