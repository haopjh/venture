Meteor.methods({

	populateFeeds: function() {
		var fs = Meteor.npmRequire('fs');
		var filePath = fs.realpathSync(process.cwd() + "/../") + "/server/assets/app/data";


		var content = fs.readFileSync(filePath + '/funding.csv', "utf-8", function read(err, data) {
          if (err) {
             throw err;
            }
        });

		var feedList = content.split("\r\n");
		var index = 0;

		_.each(feedList, function(feedStr){

			var attrList = feedStr.split(",");
			var feed = {};
			feed.name = attrList.shift();
			feed.country = attrList.shift();
			feed.timestamp = moment(attrList.shift(), "M/DD/YY").unix(),
			feed.stage = attrList.shift();
			feed.amount = attrList.shift();
			feed.investors = attrList.join(", ").replace(/"/g, "");

			var existingFeed = Feeds.findOne({
				timestamp: feed.timestamp, 
				stage: feed.stage, 
				investors: feed.investors
			});

			if(!existingFeed){
				Feeds.insert(feed);
				index++;
			}
		});

		console.log("Feeds Created: ", index);
	},

	populateStartups: function() {
		var fList = Feeds.find().fetch();

		var sList = _.groupBy(fList, function(feed){
			return feed.name;
		});

		var index = 0;

		_.each(sList, function(feeds) {

			var existingStartup = Startups.findOne({name: feeds[0].name});
			if(!existingStartup){
				if(feeds.length > 1){
					var totalFunding = 0.0;
					var timestamp = feeds[0].timestamp;
					var lastStage = feeds[0].stage;
					_.each(feeds, function(feed) {
						if(parseFloat(feed.amount) > 0){
							totalFunding += parseFloat(feed.amount);
						}
						if(feed.timestamp && timestamp < feed.timestamp){
							//There is a newer funding 
							timestamp = feed.timestamp;
							lastStage = feed.stage;
						}
					});

					Startups.insert({
						'name': feeds[0].name,
						'country': feeds[0].country,
						'timestamp': timestamp,
						'lastStage': lastStage,
						'totalFunding': totalFunding
					});
				}else{
					Startups.insert({
						'name': feeds[0].name,
						'country': feeds[0].country,
						'timestamp': feeds[0].timestamp,
						'lastStage': feeds[0].stage,
						'totalFunding': feeds[0].amount
					});
				}

				index++;
			}
				
		});

		var eList = Exits.find().fetch();
		_.each(eList, function(exit) {
			if(exit.name){
				var startup = Startups.findOne({name: exit.name});
				if(!startup) {
					Startups.insert({
						'name': exit.name,
						'country': exit.country,
						'timestamp': exit.timestamp,
						'lastStage': "Acquired",
						'totalFunding': exit.amount
					});
					index++;
				}else{
					Startups.update(startup._id, {$set: {lastStage: "Acquired"}})
				}
			}
				
		});

		console.log("Startups Created: ", index);
	},

	populateExits: function() {
		var fs = Meteor.npmRequire('fs');
		var filePath = fs.realpathSync(process.cwd() + "/../") + "/server/assets/app/data";

		var content = fs.readFileSync(filePath + '/exit.csv', "utf-8", function read(err, data) {
          if (err) {
             throw err;
            }
        });

		var exitList = content.split("\r\n");
		var index = 0;

		_.each(exitList, function(exitStr){
			var attrList = exitStr.split(",");
			var exit = {};
			exit.name = attrList.shift();
			exit.country = attrList.shift();
			var amount = attrList.shift();
			exit.amount = parseFloat(amount) ? parseFloat(amount) : amount;
			exit.timestamp = moment(attrList.shift(), "DD/MM/YY").unix(),
			exit.acquirer = attrList.join(", ").replace(/"/g, "");

			var existingExit = Exits.findOne({timestamp: exit.timestamp});
			if(!existingExit){
				Exits.insert(exit);
				index++;
			}
		});

		console.log("Exits Created: ", index);
	},

	removeExits: function() {
		Exits.remove({});
		console.log("count", Exits.find().count());
	},

	removeFeeds: function() {
		Feeds.remove({});
		console.log("count", Feeds.find().count());
	},

	removeStartups: function() {
		Startups.remove({});
		console.log("count", Startups.find().count());
	},

	populateStages: function() {
		Stages.insert({'name': "Crowdfunding"});
		Stages.insert({'name': "Venture"});
		Stages.insert({'name': "Grant"});
		Stages.insert({'name': "Award"});
		Stages.insert({'name': "Convertible Bone"});
		Stages.insert({'name': "Private Equity"});
		Stages.insert({'name': "Series A"});
		Stages.insert({'name': "Series A1"});
		Stages.insert({'name': "Series B"});
		Stages.insert({'name': "Series B1"});
		Stages.insert({'name': "Series C"});
		Stages.insert({'name': "Series C1"});
		Stages.insert({'name': "Series D"});
		Stages.insert({'name': "Series D1"});
		Stages.insert({'name': "Series E"});
		Stages.insert({'name': "Series E1"});
		Stages.insert({'name': "Series F"});
		Stages.insert({'name': "Series F1"});
		Stages.insert({'name': "Series G"});
		Stages.insert({'name': "Series G1"});

		console.log("Stages popuplated: ", Stages.find().count());
	},

	removeStages: function() {
		Stages.remove({});
		console.log("count", Stages.find().count());
	},

	// populateCategory: function() {
	// 	Stages.insert({'name': "Crowdfunding"});
	// 	Stages.insert({'name': "Venture"});
	// 	Stages.insert({'name': "Grant"});
	// 	Stages.insert({'name': "Award"});
	// 	Stages.insert({'name': "Convertible Bone"});
	// 	Stages.insert({'name': "Private Equity"});
	// 	Stages.insert({'name': "Series A"});
	// 	Stages.insert({'name': "Series A1"});
	// 	Stages.insert({'name': "Series B"});
	// 	Stages.insert({'name': "Series B1"});
	// 	Stages.insert({'name': "Series C"});
	// 	Stages.insert({'name': "Series C1"});
	// 	Stages.insert({'name': "Series D"});
	// 	Stages.insert({'name': "Series D1"});
	// 	Stages.insert({'name': "Series E"});
	// 	Stages.insert({'name': "Series E1"});
	// 	Stages.insert({'name': "Series F"});
	// 	Stages.insert({'name': "Series F1"});
	// 	Stages.insert({'name': "Series G"});
	// 	Stages.insert({'name': "Series G1"});

	// 	console.log("Stages popuplated: ", Stages.find().count());
	// },

	// removeStages: function() {
	// 	Stages.remove({});
	// 	console.log("count", Stages.find().count());
	// }
});
