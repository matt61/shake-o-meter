exports.index = function(req, res) {
	res.render('admin/index', {title : 'Express'});
};
exports.results = function(req, res) {
	req.models.event.get(req.params.id, function(err, event) {
	    res.render('admin/results', {event : req.params.id, name: event.name});
	})	
};

