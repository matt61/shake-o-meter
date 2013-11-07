/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var device = require('./routes/device');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.get('/', routes.index);
app.get('/admin', admin.index);
app.get('/device', device.index);

server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

io = require('socket.io').listen(server);

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	io.set('log level', 1);
}

io.sockets.on('connection', function(socket) {
	socket.on('event', function(event) {
		socket.join(event);
	});
});
