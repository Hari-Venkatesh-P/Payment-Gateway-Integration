const axios = require('axios')


const PaytmChecksum = require('../lib/PaytmCheckSum.js')
const logger = require('../lib/logger')
const paytmutils = require("../utils/paytmutils")

const mid = paytmutils.paytmCredentials.mid
const mkey = paytmutils.paytmCredentials.mkey
const paytmURL = paytmutils.paytmURL

async function initiatePaymentRequest (req, res) {
    console.log(req.body)
    console.log(paytmutils.paytmCredentials)
    try {
        const {orderId , amount , custId , mobile } = req.body
        if(typeof orderId == 'undefined' || typeof amount == 'undefined' ||  typeof custId == 'undefined' ||  typeof mobile == 'undefined'){
            logger.error(`Bad Request From ${custId}`)
            res.status(400).send({
              success: false,
              message: 'Bad Request'
            })
        }else{
            var body = {
                requestType : "Payment",
                mid : mid,
                orderId : orderId,
                websiteName : "WEBSTAGING",
                txnAmount : {
                    value : amount,
                    currency:"INR"
                },
                userInfo :{
                    custId : custId,
                    mobile : mobile,
                }
            }

            var temp = await PaytmChecksum.generateSignature(JSON.stringify(body), mkey)
            
            console.log(JSON.stringify(body))

            console.log(temp)

            var head = {
                version:"v1",
                channelId:"WEB",
                clientId:"C11",
                signature: temp
            }

            var reqBody = {
                head : head,
                body: body,
            }

            var URL = `${paytmURL}/theia/api/v1/initiateTransaction?mid=${mid}&orderId=${orderId}`

            logger.info(`Request URL to Paytm :  ${URL}`)
            logger.info(`Request Body to Paytm :  ${JSON.stringify(reqBody)}`)

            await axios.post(URL,reqBody).then((response)=>{
                logger.info("Response Body from Paytm :  "+JSON.stringify(response.data))
                if(response.data.body.resultInfo.resultStatus == "S"){
                    res.status(200).send({
                        success: true,
                        message: response.data
                      })
                }else{
                    res.status(502).send({
                        success: false,
                        message: response.data
                      })
                }
            })
        }
    }catch (error) {
        logger.error("Error in Initiate Payment of Paytm  :  "+error)
        res.status(500).send({
            success: false,
            message: error
        })
    }
  }


  module.exports = {
    initiatePaymentRequest
  }