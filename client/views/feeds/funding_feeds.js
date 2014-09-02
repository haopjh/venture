Template.fundingFeeds.helpers({
	getFeedGroup: function() {
		var sList = _.groupBy(Feeds.find({
			$or: [
				{name: { $regex: Session.get("searchText"), $options: 'i' }},
				{country: { $regex:  Session.get("searchText"), $options: 'i' }}
			]
		})
		.fetch(), function(feed) {
			return -feed.timestamp;
		});

		var fList = [];

		for(i in sList){
			fList.push(sList[i]);
		}

		return fList;
	},

});

	
Template.feedGroup.helpers({

	getDate: function() {
		return this[0].timestamp;
	}
});
