
exports.index = function(req, res){
  res.render('device/index', { title: 'Express' });
};
exports.exit = function(req, res){
  io.sockets.in(req.body.event).emit('exit', {user: req.sessionID});
  res.send('OK');
};
exports.shake = function(req, res){
  io.sockets.in(req.params.id).emit('join', {user: req.sessionID});
  req.models.event.get(req.params.id, function(err, event) {
	  res.render('device/shake', {event: req.params.id, name: event.name});
  }) 
};
exports.shook = function(req, res){
	var power = parseFloat(req.body.frequency)*parseFloat(req.body.amplitude);
	var seconds = new Date().getTime() / 1000;
	
	io.sockets.in(req.body.event).emit('message', {user: req.sessionID, motion: req.body.motion, power: power, response_time: seconds});
		
	req.models.response.find({event_id: req.body.event, response_time: seconds}, 1, function(err, responses) {
	  if (responses.length > 0){
		  responses[0].response_count = events[0].response_count + power;
		  responses[0].save(function (err) {
	        console.log("saved!");
		  });
	  } else {
		  req.models.response.create([{event_id: req.body.event, response_time: seconds, response_count: power}], function (err, items) {});
	  }
	}) 
	req.models.participant.find({event_id: req.body.event, uid: req.sessionID}, 1, function(err, participants) {
	  if (participants.length == 0){
		  req.models.participant.create([{event_id: req.body.event, uid: req.sessionID}], function (err, items) {});
	  }
	}) 
	res.send('OK');
};