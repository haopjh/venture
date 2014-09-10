Deps.autorun(function() {
	startupHandle = Meteor.subscribe('allStartups');
	feedHandle = Meteor.subscribe('allFeeds');
	exitHandle = Meteor.subscribe('allExits');

	if(Session.get("isRegisterFunding")){
		registerHandle = Meteor.subscribe("allStartupName", Session.get("searchText"));
		Meteor.subscribe("allStages");
	}else if(Session.get("isRegisterStartup")){
		Meteor.subscribe("allCategories");
	}
});

Meteor.Spinner.options = {
    top: '100px', // Top position relative to parent in px
    zIndex: 1,
};


if(Meteor.isClient) {
	Meteor.startup(function() {
		Session.set("searchText","");
	});
}