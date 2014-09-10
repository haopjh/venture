Template.startup.helpers({
	getFirstWord: function(name) {
		return name.charAt(0);
	},

	getFeedGroup: function() {
		var sList = _.groupBy(Feeds.find({name: this.name}).fetch(), function(feed) {
			return -feed.timestamp;
		});

		var fList = [];

		for(i in sList){
			fList.push(sList[i]);
		}

		return fList;
	},

	getInvestors: function() {
		var fList = Feeds.find({name: this.name}).fetch();
		var iList = [];
		_.each(fList, function(feed) {
			var investors = feed.investors.split(",");
			_.each(investors, function(investor) {
				if(!_.contains(iList, investor.trim())){
					iList.push(investor.trim());
				}
			});
		});
		return iList.join(" | ");
	},

	getCategories: function() {
		return this.categories;
	}
});