/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var admin = require('./routes/admin');
var device = require('./routes/device');
var http = require('http');
var path = require('path');
var pg = require('pg').native;
var orm = require('orm');
var app = express();


// all environments
app.set('conn', process.env.HEROKU_POSTGRESQL_SILVER_URL || 'postgres://polls:password@localhost:5432/shake');
app.use(orm.express(app.get('conn'), {
    define: function (db, models, next) {
        models.event = db.define("events", {id: Number, name: String,});
        models.participant = db.define("participants", {uid: String, event_id: Number});
        models.response = db.define("responses", {response_time: Number, response_count: Number, event_id: Number});
        next();
    }
}));
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

var server = http.createServer(app).listen(app.get('port'));
io = require('socket.io').listen(server);

/**
 * Initial database setup
 */

//Routes
app.get('/', routes.index);
app.get('/admin', admin.index);
app.get('/admin/:id/participants', admin.participants);
app.get('/admin/:id/history', admin.history);
app.get('/admin/:id/results', admin.results);
app.get('/device', device.index);
app.get('/device/:id/shake', device.shake);
app.post('/device/shook', device.shook);
app.post('/device/exit', device.exit);

if ('development' == app.get('env')) {
	app.use(express.errorHandler());
	io.set('log level', 1);
}

io.sockets.on("disconnect", function(socket) {
    socket.reconnect();
});

io.sockets.on('connection', function(socket) {
	socket.on('event', function(event) {
		socket.join(event);
	});
});

