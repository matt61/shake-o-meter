
exports.index = function(req, res){
  res.render('device/index', { title: 'Express' });
};
exports.shake = function(req, res){
  res.render('device/shake', { event: '1' });
};
exports.shook = function(req, res){		
	io.sockets.in(req.body.event).emit('message', {motion: req.body.motion, amplitude: req.body.amplitude, frequency: req.body.frequency, count: 1});

//	pg.connect(connection_string, function(err, client, done) {
//	  if(err) {
//	    return console.error('error fetching client from pool', err);
//	  }
//	  client.query({text: 'INSERT INTO movements (event_id, motion, amplitude, frequency, created_at) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP);', values:[req.body.event, req.body.motion, req.body.amplitude, req.body.frequency]}, function(err, result) {
//	    done();
//
//	    if(err) {
//	      return console.error('error running query', err);
//	    }
//	  });
//	});
};