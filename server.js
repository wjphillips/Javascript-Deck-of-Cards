var express = require('express');
var app = express();
var path = require('path');
var server = app.listen(8002);

//sockets
io = require('socket.io').listen(server);

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded());

//Session
var session = require('express-session');
app.use(session({
	secret: 'keyboard cat',
	resave: false,
	saveUninitialized: true
}));

//Static
app.use(express.static(__dirname + '/client'));

//Views
app.set('views', path.join(__dirname, './client'));
app.set('view engine', 'ejs');

//HTTP Routes
require('./routes.js')(app);
//Socket Routes
// require('./server/config/socket.routes.js')(app);