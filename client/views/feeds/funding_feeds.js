Template.fundingFeeds.helpers({

	hasFilter: function(){
		return Session.get("sortBy") === undefined ? false : true;
	},

	getFeedGroup: function() {

		if(Session.get("sortBy")){
			var sort = Session.get("sortBy");
			if(sort === "name"){
				return Feeds.find({},{sort: {name: 1}});
			}else if(sort === "stage"){
				return Feeds.find({},{sort: {stage: 1}});
			}else if(sort === "date"){
				return Feeds.find({},{sort: {timestamp: 1}});
			}else{
				return Feeds.find();
			}
		}else{
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
			
		}
	},

});

	
Template.feedGroup.helpers({

	getDate: function() {
		return this[0].timestamp;
	}
});
