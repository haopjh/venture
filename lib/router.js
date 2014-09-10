Router.configure({
	layoutTemplate: 'layout',
});

Router.onBeforeAction(function(){
	console.log();
	if(!Meteor.loggingIn() && !Meteor.user()) {
		console.log("this ran");
		Router.go('unauthorized');
	}
},{except: ['unauthorized']});


Router.map(function() {
	this.route('home', {path: "/"});
	this.route('fundingFeeds', {
		path: "funding-feeds",
		waitOn: function () {
			return feedHandle;
		},
		action: function () {
			if (this.ready()) {
				this.render();
			}else {
					this.render('loadingTemplate');
			}
		}
	});
	this.route('settings');
	this.route('startups', {
		waitOn: function () {
			return startupHandle;
		},
		action: function () {
			if (this.ready()) {
				this.render();
			}else {
				this.render('loadingTemplate');
			}
			
		},
	});
	this.route('startup', {
		path: 'startup/:name',
		waitOn: function () {
			return Meteor.subscribe("singleStartup", this.params.name);
		},
		action: function () {
			if (this.ready()) {
				this.render();
			}else {
				this.render('loadingTemplate');
			}
		},
		data: function() {
			return Startups.findOne({name: this.params.name});
		}
	});
	this.route('exits', {
		waitOn: function () {
			return exitHandle;
		},
		action: function () {
			if (this.ready()) {
				this.render();
			}else {
				this.render('loadingTemplate');
			}
		}
	});
	this.route('newsMention', {path: "news-mention"});

	this.route('register-startup', {
		path: "register/startup",
		onRun: function() {
			Session.set("isRegisterStartup", true);
		},
		onStop: function(){
			Session.set("isRegisterStartup", false);
		}
	});
	this.route('register-funding', {
		path: "register/funding",
		onRun: function() {
			Session.set("isRegisterFunding", true);
		},
		onStop: function(){
			Session.set("isRegisterFunding", false);
		}
	});

	this.route('admin');

	this.route('unauthorized');

});
