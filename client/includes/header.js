Template.header.events({
	'submit form': function(e) {
		e.preventDefault();
	},
});

Template.header.rendered = function() {
	$(".searchbar").on("input", function() {
		Session.set("searchText", $(".searchbar").val())

	});
};

