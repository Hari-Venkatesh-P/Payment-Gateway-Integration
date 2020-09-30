const express = require('express')
const app = express()
const cors = require('cors')
const router = require('express').Router()
const bodyparser = require('body-parser')

const configuration = require('./configuration')

var serverconfig = configuration.serverconfig;

app.use(cors());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));

app.get('/',function(req,res){
    res.send("Welcome to Hari Payment Gateways")
})


const paytmroute = require('./routers/paytmroute');
app.use('/paytm', paytmroute);


app.listen(serverconfig.PORT, () => {
    console.log('Hari Payment Gateway Server running on PORT :' + serverconfig.PORT)
})
