exports.index = function(req, res){
	req.models.event.find({}, function(err, events) {
		res.render('index', { events: events});
	});
};