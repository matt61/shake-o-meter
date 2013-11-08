var MobileDetect = require('mobile-detect');

exports.index = function(req, res){	
    md = new MobileDetect(req.headers['user-agent']);
    if(md.mobile()){
    	req.models.event.find({}, function(err, events) {
			res.render('device/index', { events: events});
		});
    } else {
		req.models.event.find({}, function(err, events) {
			res.render('index', { events: events});
		});
    }
};