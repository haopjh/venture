Template.loadMore.events({
	'click #load-more': function() {
		var counter;
		var handle;
		if(Router.current().path === "/funding-feeds") {
			counter = function(){
				return Feeds.find({}).count();
			}
			handle = feedHandle;
		}else if(Router.current().path === "/startups") {
			counter = function(){
				return Startups.find({}).count();
			}
			handle = startupHandle;
		}else if(Router.current().path === "/exits") {
			counter = function(){
				return Exits.find({}).count();
			}
			handle = exitHandle;
		}


		var limit = counter();
		handle.loadNextPage();

		Meteor.setTimeout(function(){
			if(limit === counter()){

				$("#load-more").text("No More Feeds");
				$("#load-more").removeClass("btn-info");
				$("#load-more").addClass("btn-default");
				$("#load-more").addClass("disabled");

			}
		},500);
	},
});