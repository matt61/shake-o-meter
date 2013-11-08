
exports.index = function(req, res){
  res.render('device/index', { title: 'Express' });
};
exports.exit = function(req, res){
  io.sockets.in(req.body.event).emit('exit', {user: req.sessionID});
  res.send('OK');
};
exports.shake = function(req, res){
  io.sockets.in(req.params.id).emit('join', {user: req.sessionID});
  res.render('device/shake', {event: req.params.id});
};
exports.shook = function(req, res){
	io.sockets.in(req.body.event).emit('message', {user: req.sessionID, motion: req.body.motion, power: parseFloat(req.body.frequency)*parseFloat(req.body.amplitude)});
	res.send('OK');
};