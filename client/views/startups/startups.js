Template.startups.helpers({
	getStartups: function() {
		return Startups.find({
			$or: [
				{name: { $regex: Session.get("searchText"), $options: 'i' }},
				{country: { $regex:  Session.get("searchText"), $options: 'i' }}
			]
		}).fetch();
	},

	hasStartups: function() {
		return Startups.find().count() > 0;
	},
});