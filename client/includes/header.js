Template.header.events({
	'submit form': function(e) {
		e.preventDefault();
		var user = $("#username").val();
		var pwd = $("#password").val();
		Meteor.loginWithPassword(user, pwd, function(err){
			if(err){
				$(".label-login").css("display","block");
				console.log(err.message);
			}else{
				Router.go('/funding-feeds');
				$(".dropdown").removeClass("open");
				console.log("Logged In Successfully");
			}
		});
	},

	'click .btn-logout': function(){
		Meteor.logout(function(){
			console.log("successfully logged out");
		});
	}
});

Template.header.rendered = function() {
	$(".searchbar").on("input", function() {
		Session.set("searchText", $(".searchbar").val())

	});
};

