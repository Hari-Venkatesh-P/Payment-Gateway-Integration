var CryptoJS = require("crypto-js");


const logger = require('../lib/logger')

var temp = {
    name : "hari-payment-gateways",
    password:"BeABeliever"
} 

function isAuth(req, res, next) {
    logger.info("Verifying Auth present from client.")
    const headerAuthFromClient = req.headers['x-auth'];
    var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(temp), 'secret key 123').toString();
    console.log("Cipher Text : "+ciphertext)
    if(typeof headerAuthFromClient !== 'undefined') {
        var bytes  = CryptoJS.AES.decrypt(headerAuthFromClient, 'secret key 123');
        var clientHeader = JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
        if(clientHeader.name !="hari-payment-gateways"){
            res.status(403).send({
                status:false,
                message:"Invalid X-Auth"
            });
        }else if(clientHeader.password !="BeABeliever"){
            res.status(403).send({
                status:false,
                message:"Invalid X-Auth"
            });
        }else{
            next();
        }
    } else {
        res.status(403).send({
            status:false,
            message:"Missing Mandatory X-Auth"
        });
    }
}

module.exports = {
    isAuth
}