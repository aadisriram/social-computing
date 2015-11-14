"use strict";

var Twit = require('twit');

var Location = {
	HUNT       : "#hunt", 
	EB2        : "#eb2",
	CARMICHAEL : "#carmichael", 
	OVAL       : "#oval", 
	PARTY      : "#party"
}

var Relationships = {
	FAMILY    : "family", 
	FRIEND    : "friend", 
	STRANGER  : "stranger", 
	COLLEAGUE : "colleague"};

var RelationPriorityType = {
	"family"    : "high",
	"friend"    : "high",
	"medium"    : "medium",
	"stranger"  : "low"
}

var RingerMode = {
	SILENT : "Silent",
	LOUD   : "Loud"
}

var People = {
	"Anakin"    : Relationships.FAMILY,
	"Chewbacca" : Relationships.FRIEND,
	"Han"       : Relationships.FRIEND,
	"JarJar"    : Relationships.FRIEND,
	"Jango"     : Relationships.STRANGER,
	"Leia"      : Relationships.FAMILY,
	"Luke"      : Relationships.FAMILY,
	"Padme"     : Relationships.FAMILY,
	"Mace"      : Relationships.COLLEAGUE,
	"ObiWan"    : Relationships.COLLEAGUE,
	"Yoda"      : Relationships.COLLEAGUE
}

var RelationshipScoring = {
	"high"   : 0.6,
	"medium" : 0.3,
	"low"    : 0.1
}

var RingerModeScoring = {
	"Loud"   : 0.7,
	"Silent" : 0.3
}

var LocationScoring = {
	"#hunt"       : 0.05,
	"#eb2"        : 0.10,
	"#carmichael" : 0.4,
	"#oval"       : 0.7,
	"#party"      : 0.9
}

class Context {
	constructor() {
		this.relation = Relationships.FAMILY;
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
	var utilityValue = RingerModeScoring[userContext.ringerMode] * 0.1 
						+ callerContext.urgent * 0.3 
						+ LocationScoring[userContext.location] * 0.4
						+ RelationshipScoring[callerContext.relation] * 0.2;
	return (utilityValue >= Math.Random());
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
				 				+ '\n Name: Aaditya Sriram'
				 				+ '\n MY_MODE: ' + userContext.ringerMode 
				 				+ '\n EXPECTED_MODE: ' + userContext.expectedRingerMode
				 				+ '\n #' + tweet["text"].split("#")[2].split(" ")[0] + ' #P2CSC555F15';
				replyToTweet(tweetText, tweet.id_str);
			}
		} else if (tweet["text"].indexOf("Call") > -1) {
			try {
				var splitText = tweet["text"].split("\n");
				var caller = splitText[1].split(" : ")[1];
				var urgent = splitText[2].split(" : ")[1];
				var responseToString = splitText[3];
	
				if (responseToString == userContext.lastTag) {
					var callerContext = new CallerContext(caller, urgent);
					callerContext.relation = Relationships[caller];
					userLocationMap[caller] = userContext.location;
					var action = 'No';
					if (utility(userContext, callerContext)) {
						action = 'Yes';
					}
					
					var tweetText = 'ACTION: ' + action +  ' ' + responseToString;
				}
			} catch(err) {
				console.log(tweet["text"]);
			}
		} else if (tweet["text"].indexOf("ACTION") > -1) {
			try {
				if (userLocationMap[tweet.user["screen_name"]] != userContext.location) {
					var tweetText = '@' + tweet.user["screen_name"] + '\nName: Aaditya Sriram\nRESPONSE:';
					if (tweet["text"].split(" ")[1] == 'yes') {
						tweetText += ' Negative'
					} else {
						tweetText += ' Positive'
					}
	
					tweetText += '\n #' + tweet["text"].split("#")[1].split(" ")[0] + ' #P2CSC555F15'
					replyToTweet(tweetText, tweet.id_str);
				}
			} catch(err) {
				
			}
		} else if (tweet["text"].indexOf("MY_MODE") > -1) {
			var splitText = tweet["text"].split("\n");
			var responseToString = splitText[4];
			
			if (responseToString == userContext.lastCheckinTag) {
				// Neighbor response to your last check-in
				console.log("Response for : " + responseToString);
			}
		} else if (tweet["text"].indexOf("LOCATION") > -1) {
			var splitText = tweet["text"].split("\n");
			var responseToString = splitText[3];
			
			if (responseToString == userContext.lastCheckinTag) {
				// Response from location bot to your last check-in
				var noiseLevel = splitText[2].split(" ")[1];
				userContext.noiseLevel = noiseLevel;
				console.log("Noise level : " + noiseLevel);
			}
		}
	}
});

var userContext = new UserContext();

process.stdin.on('data', function (data) {
	if (data.indexOf('checkin') > -1) {
		var location = "#" + data.split(" ")[1].split('\n')[0];
		userContext.location = location;
		if (location == Location.HUNT || loaction == Location.EB2)
			userContext.ringerMode = RingerMode.Silent;
		else
			userContext.ringerMode = RingerMode.Loud;
		userContext.tweetCount++;
		var replyString = getReplyString(true);
		userContext.lastCheckinTag = replyString;
		var tweetText = location + replyString;
		T.post('statuses/update', { status: 'I checked in at ' + tweetText }, function(err, data, response) {
			// console.log(data)
		});
	} else if (data.indexOf('call') > -1) {
		var tweetText = getReplyString(true);
		userContext.lastTag = tweetText;
		T.post('statuses/update', { status: 'CALL ' + tweetText}, function(err, data, response) {
			// console.log(data)
		});
	} else if (data.indexOf('close') > -1) {
		stream.stop();
		process.exit(0);
	}
});