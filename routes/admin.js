exports.index = function(req, res) {
	res.render('admin/index', {title : 'Express'});
};
exports.participants = function(req, res) {
	req.models.participant.find({event_id: req.params.id}, function(err, participants) {
		res.send(participants);
	})
};
exports.history = function(req, res) {
	history = [];
	var seconds = (new Date().getTime() / 1000) - 1000;
	req.models.response.find({event_id: req.params.id}).where("response_time > ?", [seconds]).all(function(err, responses) {
		for(var i=0;i<responses.length;i++){
			history.push([responses[i].response_time, responses[i].response_count]);
		}
		res.send(history);
	})
};
exports.results = function(req, res) {
	req.models.event.get(req.params.id, function(err, event) {
	    res.render('admin/results', {event : req.params.id, name: event.name});
	})
};

