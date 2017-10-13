require('rootpath')();
var express = require('express');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');
var config = require('config.json');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function(err, req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header( "Access-Control-Allow-Methods" , "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With, x-access-token, x-email-id, x-device-id, x-device-token, x-device-type, x-system-cookie")
    res.header("Access-Control-Expose-Headers", "organizationId, cardConfigVersion")
    res.setHeader('Content-Type', 'application/json');
 
    if (req.method === 'OPTIONS') return res.send(200)
    next()
   });

// make '/app' default route
app.use('/api/todo',require('./controllers/todo.controller'));

// start server
var server = app.listen(3000, function () {
    console.log('Server listening at http://' + server.address().address + ':' + server.address().port);
});