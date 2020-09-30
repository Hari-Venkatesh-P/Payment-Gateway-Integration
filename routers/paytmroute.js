const router = require('express').Router()

const paytmservices = require('../services/paytmservice')
const interceptor = require("../middleware/interceptor")

router.post("/initializepayment",interceptor.isAuth,paytmservices.initiatePaymentRequest)

module.exports = router;
