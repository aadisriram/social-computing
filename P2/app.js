"use strict";

var Twit = require('twit');

var Location = {
	HUNT       : "#hunt", 
	EB2        : "#eb2",
	CARMICHAEL : "#carmichael", 
	OVAL       : "#oval", 
	PARTY      : "#party"
}

var RelationPriorityType = {
	FAMILY    : "high",
	FRIEND    : "high",
	COLLEAGUE : "medium",
	STRANGER  : "low"
}

var RingerMode = {
	SILENT : "Silent",
	LOUD   : "Loud"
}

class Context {
	constructor() {
		this.relation = RelationPriorityType.FAMILY;
	}
}

class UserContext extends Context {
	constructor() {
		super();
		this.location = Location.HUNT;
		this.noiseLevel = 4;
		this.surrounding = [];
		this.ringerMode = RingerMode.LOUD;
		this.expectedRingerMode = RingerMode.LOUD;
		this.tweetCount = 0;
		this.tweetId = '25076520';
		this.lastTag = null;
	}
}

class CallerContext extends Context {
	constructor(caller, urgent) {
		super();
		this.urgent = urgent;
	}
}

var userLocationMap = {};

function utility(userContext, callerContext) {
	return userContext.ringerMode == RingerMode.LOUD
			&& callerContext.urgent;
}

function getReplyString(incrCount) {
	if (incrCount)
		userContext.tweetCount++;
	return ' #id_asriram4_' + userContext.tweetCount + ' #P2CSC555F15';
}

function replyToTweet(tweetText, tweetId) {
	T.post('statuses/update', { status: tweetText, in_reply_to_status_id: tweetId }, function(err, data, response) {
					// Tweet pushed, do something?
	});
}

var T = new Twit({
  consumer_key: 'rVnoiJ3KH5Qv7csdKvZyGAeM4',
  consumer_secret: '3mMAsoTkpFVqSGcGw1kq2VptrJ1XxcRtSIL7t15vlaCH0xXbtB',
  access_token: '25076520-FjbwfCTGaYSde6GxYvUh0WENFZ8R7wKRxlUzivA5b',
  access_token_secret: 'EchqKQM0PPWw76jsPMZ9xJ9e0pN8JUcxCeD9FgjGTVYRL'
});

process.stdin.resume();
process.stdin.setEncoding('utf8');

var stream = T.stream('statuses/filter', { track: '#P2CSC555F15' });

// Track tweets with the hashtag belonging to our class
stream.on('tweet', function (tweet) {
	if (tweet["user"].id_str != userContext.tweetId) {
		if (tweet["text"].indexOf("checked") > -1) { 
			var userName = tweet.user["screen_name"];
			userLocationMap[userName] = '#' + tweet["text"].split("#")[1];
			if(tweet["text"].indexOf(userContext.location) > -1) {
				var userName = tweet.user["screen_name"];
				var tweetText = '@' 
				 				+ userName 
				 				+ '\n MY_MODE: ' + userContext.ringerMode 
				 				+ '\n EXPECTED_MODE: ' + userContext.expectedRingerMode
				 				+ '\n Name: Aaditya Sriram'
				 				+ '\n #' + tweet["text"].split("#")[2].split(" ")[0] + ' #P2CSC555F15';
				replyToTweet(tweetText, tweet.id_str);
			}
		} else if (tweet["text"].indexOf("Call") > -1) {
			var splitText = tweet["text"].split("\n");
			var caller = splitText[1].split(" : ")[1];
			var urgent = splitText[2].split(" : ")[1];
			var responseToString = splitText[3];

			if (responseToString == userContext.lastTag) {
				var callerContext = new CallerContext(caller, urgent);
				if (utility(userContext, callerContext)) {

				}
			}
		} else if (tweet["text"].indexOf("ACTION") > -1) {
			if (userLocationMap[tweet.user["screen_name"]] != userContext.location) {
				var tweetText = '@' + tweet.user["screen_name"] + '\nRESPONSE:';
				if (tweet["text"].split(" ")[1] == 'yes') {
					tweetText += ' Negative'
				} else {
					tweetText += ' Positive'
				}

				tweetText += '\n #' + tweet["text"].split("#")[2].split(" ")[0] + ' #P2CSC555F15'
				replyToTweet(tweetText, tweet.id_str);
			}
		}
	}
});

var userContext = new UserContext();

process.stdin.on('data', function (data) {
	if (data.indexOf('checkin') > -1) {
		var location = "#" + data.split(" ")[1].split('\n')[0];
		userContext.location = location;
		userContext.tweetCount++;
		var replyString = getReplyString();
		userContext.lastTag = replyString;
		var tweetText = location + replyString;
		T.post('statuses/update', { status: 'I checked in at ' + tweetText }, function(err, data, response) {
			// console.log(data)
		});
	} else if (data.indexOf('call')) {
		T.post('statuses/update', { status: 'CALL ' + getReplyString() }, function(err, data, response) {
			// console.log(data)
		});
	}
});