var express = require('express');
var path = require('path');
const db = require('./api/utils/db');
const bodyParser = require('body-parser');
const config = require('./api/utils/config');

var app = express();

//parse request data content type application / x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended:false}));

//parse request data content type application/json
app.use(bodyParser.json());

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//define root routes
app.get('/', (req, res)=>{
    res.send("Hello world!");
})

//import DB routes
const share_market = require('./routes/share_market')

//create route
app.use('/ShareMarket/p1',share_market )

db.getConnection()
.then(()=>{
    app.listen(config.port, () =>{
        console.log(`server Started at http://${config.host}:${config.port}`)
    })
})
.catch((error)=>{
    console.log(error)
})

module.exports = app;