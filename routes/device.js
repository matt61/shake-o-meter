
exports.index = function(req, res){
  res.render('device/index', { title: 'Express' });
};
exports.shake = function(req, res){
  res.render('device/shake', { event: '1' });
};
exports.shook = function(req, res){
	io.sockets.in(req.body.event).emit('message', {user: req.sessionID, motion: req.body.motion, power: parseFloat(req.body.frequency)*parseFloat(req.body.amplitude)});
	res.send('OK');
};