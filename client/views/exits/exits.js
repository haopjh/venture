Template.exits.helpers({
	getExits: function() {

		return Exits.find({
			$or: [
				{name: { $regex: Session.get("searchText"), $options: 'i' }},
				{country: { $regex:  Session.get("searchText"), $options: 'i' }}
			]
		}).fetch();
	},

	hasExits: function() {
		return Exits.find().count() > 0;
	},
});