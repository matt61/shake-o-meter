var pg = require('pg').native;

exports.index = function(req, res){
	pg.connect(connection_string, function(err, client, done) {
		  if(err) {
		    return console.error('error fetching client from pool', err);
		  }
		  client.query('SELECT * FROM events', function(err, result) {
		    //call `done()` to release the client back to the pool
		    done();

		    if(err) {
		      return console.error('error running query', err);
		    }
		    console.log(result.rows[0].name);
		    res.render('index', { events: result.rows});
		    //output: 1
		  });
		});  
};