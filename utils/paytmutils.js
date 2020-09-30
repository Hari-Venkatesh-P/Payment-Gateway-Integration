var PaytmChecksum = require("../lib/PaytmCheckSum.js");


const paytmCredentials = {
    mid : "TPSxtR55283914598253",
    mkey: "lOigMLVjdJmbcCTB"
}

const paytmURL = "https://securegw-stage.paytm.in"

module.exports = {
    paytmCredentials,
    paytmURL
}