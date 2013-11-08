/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var device = require('./routes/device');
var http = require('http');
var path = require('path');
//var pg = require('pg').native;
//connection_string =  process.env.DATABASE_URL || 'postgres://polls:password@localhost:5432/shake';

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
app.use(express.bodyParser());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

var server = http.createServer(app).listen(3000);
io = require('socket.io').listen(server);

/**
 * Initial database setup
 */

//var connection_string = process.env.DATABASE_URL || 'postgres://polls:password@localhost:5432/shake';
//var client = new pg.Client(connection_string);
//client.connect();
//client.query('CREATE TABLE events (id SERIAL, lat float, long float, event_date timestamp);');


//Routes
app.get('/', routes.index);
app.get('/admin', admin.index);
app.get('/admin/:id/results', admin.results);
app.get('/device', device.index);
app.get('/device/:id/shake', device.shake);
app.post('/device/shook', device.shook);

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	io.set('log level', 1);
}

io.sockets.on('connection', function(socket) {
	socket.on('event', function(event) {
		socket.join(event);
	});
});

