Exits = new Meteor.Collection('exits');

Meteor.methods({

	newExits: function(exitAttr) {

		if (!exitAttr.name)
      		throw new Meteor.Error(422, 'Every exit must have a name');

		var exit = _.extend(_.pick(exitAttr, 'name', 'country',
			'amount', 'timestamp', 'acquirer'),{});

		exit._id = Exits.insert(exit);

		return exit._id;
	}

});

