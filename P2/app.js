"use strict";

var Twit = require('twit');

var RelationPriorityType = {
	FAMILY    : "high",
	FRIEND    : "high",
	COLLEAGUE : "medium",
	STRANGER  : "low"
}

var RingerMode = {
	SILENT : "silent",
	LOUD : "loud"
}

class Context {
	constructor() {
		this.relation = RelationPriorityType.FAMILY;
	}
}

class UserContext extends Context {
	constructor() {
		super();
		this.location = null;
		this.noiseLevel = null;
		this.surrounding = [];
		this.ringerMode = RingerMode.LOUD;
		this.expectedRingerMode = RingerMode.LOUD;
	}
}

class CallerContext extends Context {
	constructor() {
		super();
		this.urgent = true;
	}
}



function utility(userContext, callerContext) {
	return userContext.ringerMode == RingerMode.LOUD
			&& callerContext.urgent;
}

var T = new Twit({
  consumer_key: 'rVnoiJ3KH5Qv7csdKvZyGAeM4',
  consumer_secret: '3mMAsoTkpFVqSGcGw1kq2VptrJ1XxcRtSIL7t15vlaCH0xXbtB',
  access_token: '25076520-FjbwfCTGaYSde6GxYvUh0WENFZ8R7wKRxlUzivA5b',
  access_token_secret: 'EchqKQM0PPWw76jsPMZ9xJ9e0pN8JUcxCeD9FgjGTVYRL'
});

if (utility(new UserContext(), new CallerContext())) {
	T.post('statuses/update', { status: 'Dear bot are you working??? #oval #id_asriram4_3 #P2CSC555F15' }, function(err, data, response) {
  		console.log(data)
	});
}