"use strict";
var fs = require('fs');

var member_map = {};

class MemberActions {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.number_likes = 0;
    this.number_posts = 0;
    this.number_shared_posts = 0;
    this.number_media_posts = 0;
    this.number_external_url = 0;
    this.number_poll_posts = 0;
    this.number_comments = 0;
    this.posts_shared = 0;
    this.posts_tagged_other = 0;
    this.comments_tagged_other = 0;
    this.files_uploaded = 0;
    this.number_likes_received = 0;
    this.number_comments_received = 0;
    this.number_replies_comments = 0;
    this.number_posts_tagged = 0;
    this.number_comment_tagged = 0;
    this.number_got_shared_post = 0;
    this.number_flagged_spam = 0;
    this.poll_participation = 0;
  }
};

var members;
fs.readFile('group_members.json', 'utf8', function (err, data) {
  if (err) throw err;
  members = JSON.parse(data);
  for (var i in members.data) {
  	var memberAction = new MemberActions(members.data[i].id, members.data[i].name);
  	member_map[memberAction.id] = memberAction;
  }

  var group_feed;
  fs.readFile('group_feed.json', 'utf8', function(error, feed_data) {
  	if (error) throw error;
  	group_feed = JSON.parse(feed_data);
  	for (var i in group_feed.data) {
  		var memberAction = member_map[group_feed.data[i].from.id];
  		console.log(memberAction);
  	}
  });
});