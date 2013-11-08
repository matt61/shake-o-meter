exports.index = function(req, res) {
	res.render('admin/index', {title : 'Express'});
};
exports.participants = function(req, res) {

	req.models.participant.find({event_id: req.params.id}, function(err, participants) {
		res.send(participants);
	})
};
exports.results = function(req, res) {
	req.models.event.get(req.params.id, function(err, event) {
	    res.render('admin/results', {event : req.params.id, name: event.name});
	})
};

