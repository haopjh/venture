Meteor.publish('allStartups', function(limit) {

	return Startups.find({}, {sort: {name: 1}, limit: limit});
});

Meteor.publish('allFeeds', function(limit) {

	return Feeds.find({}, {sort: {timestamp: -1}, limit: limit});
});

Meteor.publish('allExits', function(limit) {

	return Exits.find({}, {sort: {timestamp: -1}, limit: limit});
});




Meteor.publish('allStartupName', function(searchText) {
	return Startups.find({
		$or: [
			{name: { $regex: searchText, $options: 'i' }}
		]
	}, {fields: {name: 1}, sort: {name: 1}});
});

Meteor.publish('singleStartup', function(startupName) {
	return Startups.find({name: startupName});
});

Meteor.publish("allStages", function(){
	return Stages.find();
});