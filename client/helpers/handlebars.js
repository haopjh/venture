Handlebars.registerHelper('pluralize', function(n, thing) {
  // fairly stupid pluralizer
  if (n === 1) {
    return '1 ' + thing;
  } else {
    return n + ' ' + thing + 's';
  }
});

Handlebars.registerHelper('activeRouteClass', function() {
	var args = Array.prototype.slice.call(arguments, 0);
	args.pop();


	var active = _.any(args, function(name) {
		return Router.current() && Router.current().route.name === name
	});

	return active && 'active';
});



Handlebars.registerHelper('parseDate', function(timestamp) {
	return moment.unix(timestamp).format("Do MMMM YYYY");
});

Handlebars.registerHelper('searchText', function() {
	return Session.get("searchText");
});

Handlebars.registerHelper('getParsedAmount', function(amount) {
	return parseFloat(amount) ? amount+" M" : amount;
});
