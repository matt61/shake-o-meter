exports.index = function(req, res){
  res.render('device/index', { title: 'Express' });
};
exports.shake = function(req, res){
  res.render('device/shake', { event: '1' });
};