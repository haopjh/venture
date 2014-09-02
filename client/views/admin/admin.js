Template.admin.events({

	'click #remove-all': function(event) {
		Meteor.call("removeFeeds");
		Meteor.call("removeStartups");
		Meteor.call("removeExits");
	},
	'click #remove-feeds': function() {
		Meteor.call("removeFeeds");
	},
	'click #remove-startups': function() {
		Meteor.call("removeStartups");
	},
	'click #remove-exits': function() {
		Meteor.call("removeExits");
	},


	'click #populate-all': function() {
		Meteor.call("populateFeeds");
		Meteor.call("populateExits");
		Meteor.setTimeout(function() {
			Meteor.call("populateStartups");
		},1000);

	},
	'click #populate-feeds': function() {
		Meteor.call("populateFeeds");
	},
	'click #populate-startups': function() {
		Meteor.call("populateStartups");
	},
	'click #populate-exits': function() {
		Meteor.call("populateExits");
	},



	'click #remove-stages': function() {
		Meteor.call("removeStages");
	},
	'click #populate-stages': function() {
		Meteor.call("populateStages");
	},

});