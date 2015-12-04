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

var summary = {
  posts: 0,
  likes: 0,
  comments: 0
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
  	  summary["posts"]++;
  		// console.log(group_feed.data[i].from.id);
  		var feed_entry = group_feed.data[i];
  		var memberAction = member_map[feed_entry.from.id];
  		if (memberAction) {
  			memberAction.number_posts++;
  			if (feed_entry.likes) {
  				memberAction.number_likes_received += feed_entry.likes.data.length;
  				summary["likes"] += feed_entry.likes.data.length;
  				for (var k = 0; k < feed_entry.likes; k++) {
  				  if (member_map[feed_entry.likes.data[k].id]) {
  				    member_map[feed_entry.likes.data[k].id].like_count++;
  				  }
  				}
  			}

  			if (feed_entry.shares) {
  				memberAction.number_got_shared_post += feed_entry.shares.count;
  			}

  			if (feed_entry.comments) {
  			  summary["comments"] += feed_entry.comments.data.length;
  				memberAction.number_comments_received += feed_entry.comments.data.length;
  				var comments_data = feed_entry.comments.data;
  				for (var k = 0; k < comments_data.length; k++) {
  					if (comments_data[k].message_tags) {
  						if (member_map[comments_data[k].from.id]) {
  							member_map[comments_data[k].from.id].number_comments++;
  							summary["comments"]++;
  							member_map[comments_data[k].from.id].comments_tagged_other += comments_data[k].message_tags.length;
  							member_map[comments_data[k].from.id].number_likes_received += comments_data[k].like_count;
  							summary["likes"] += comments_data[k].like_count;
  						}
  						for (var j = 0; j < comments_data[k].message_tags.length; j++) {
  							if (member_map[comments_data[k].message_tags[j].id]) {
  								member_map[comments_data[k].message_tags[j].id].number_comment_tagged++;
  							}
  						}
  					}
  				}
  			}

  			if (feed_entry.shares) {
  				memberAction.number_got_shared_post += feed_entry.shares;
  			}

  			if (feed_entry.link) {
  			  if ((feed_entry.type == "photo") || (feed_entry.type == "video"))
  			    memberAction.number_media_posts++;
  			  else
  				  memberAction.number_external_url++;
  			}

  			if (feed_entry.story) {
  				if (feed_entry.story.indexOf('file') > -1) {
  					memberAction.files_uploaded++;
  				}
  			}

  			if (feed_entry.to.data.length > 1)
  			{
  				memberAction.posts_tagged_other += feed_entry.to.data.length - 1;
  				for (i = 1; i < feed_entry.to.data.length; i++) {
  					if (member_map[feed_entry.to.data[i].id]) {
  						member_map[feed_entry.to.data[i].id].number_posts_tagged++;
  					}
  				}
  			}

  			member_map[feed_entry.from.id] = memberAction;		
  		}
  	}
  	
  	var csv_data = '';
  	csv_data += 'id,name,likes,posts,shares,media posts,external urls,polls,comments,posts shared,posts tagged others,comments tagged others,files uploaded,number likes recd,number comments recd,replies comments,posts got tagged,comments got tagged,number of shares,number flagged,poll participation\n';
    for (var member_id in member_map) {
      var member = member_map[member_id];
      csv_data += 
                member.id 
                + "," + member.name 
                + "," + member.number_likes 
                + "," + member.number_posts
                + "," + member.number_shared_posts
                + "," + member.number_media_posts
                + "," + member.number_external_url 
                + "," + member.number_poll_posts 
                + "," + member.number_comments 
                + "," + member.posts_shared 
                + "," + member.posts_tagged_other 
                + "," + member.comments_tagged_other 
                + "," + member.files_uploaded 
                + "," + member.number_likes_received 
                + "," + member.number_comments_received 
                + "," + member.number_replies_comments 
                + "," + member.number_posts_tagged 
                + "," + member.number_comment_tagged 
                + "," + member.number_got_shared_post 
                + "," + member.number_flagged_spam 
                + "," + member.poll_participation 
                + "\n";
    }
    
    fs.writeFile('temp.csv', csv_data, function (err,csv) {
      if (err) {
        return console.log(err);
      }
    });
    
    console.log(summary);
  });
});