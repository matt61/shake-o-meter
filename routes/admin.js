exports.index = function(req, res) {
	res.render('admin/index', {title : 'Express'});
};
exports.results = function(req, res) {
	res.render('admin/results', {event : req.params.id});
};

