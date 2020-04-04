const express = require('express');
const bodyParser = require('body-parser')
const path = require('path')

const router_Gerenciador = require('./route/router_Gerenciador.js')

const app = express()
const port = process.env.port || 7000;



app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static('public'))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});




app.listen(port, () => {
    console.log(`Servidor conectado à porta: ${port}`);
});

router_Gerenciador(app)