Feeds = new Meteor.Collection('feeds');

Meteor.methods({

	newFeed: function(feedAttr) {

		if (!feedAttr.name)
      		throw new Meteor.Error(422, 'Every feed must have a name');

		var feed = _.extend(_.pick(feedAttr, 'name', 'category', 'country',
			'stage', 'amount', 'timestamp', 'investors'),{});

		feed._id = Feeds.insert(feed);

		return feed._id;
	}

});

