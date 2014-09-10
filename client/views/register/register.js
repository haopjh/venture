/*******************************
*   Register Startup
******************************/

Template.registerStartup.helpers({
    getAllCategories: function() {
        return Categories.find({},{sort:{name:1}});
    },
});


Template.registerStartup.events({
	'submit form': function(event) {
    	event.preventDefault();
    	var isValid = true;
    	if(!$(event.target).find('[name=name]').val()){
            $(".form-group-name").removeClass("has-success");
    		$(".form-group-name").addClass("has-error");
    		isValid = false;
    	}else{
    		$(".form-group-name").removeClass("has-error");
    		$(".form-group-name").addClass("has-success");
    	}
    	if(!$(event.target).find('[name=url]').val()){
            $(".form-group-url").removeClass("has-success");
    		$(".form-group-url").addClass("has-error");
    		isValid = false;
    	}else{
    		$(".form-group-url").removeClass("has-error");
    		$(".form-group-url").addClass("has-success");
    	}
    	if(!$(event.target).find('[name=location]').val()){
            $(".form-group-location").removeClass("has-success");
    		$(".form-group-location").addClass("has-error");
    		isValid = false;
    	}else{
    		$(".form-group-location").removeClass("has-error");
    		$(".form-group-location").addClass("has-success");
    	}

        var categories = $("#register-category").find(":selected");
        var cList = [];
        _.each(categories, function(category){
            cList.push(category.text);
        });

    	if(cList.length === 0){
            $(".form-group-category").removeClass("has-success");
    		$(".form-group-category").addClass("has-error");
    		isValid = false;
    	}else{
    		$(".form-group-category").removeClass("has-error");
    		$(".form-group-category").addClass("has-success");
    	}
    	if(!$(event.target).find('[name=description]').val()){
            $(".form-group-description").removeClass("has-success");
    		$(".form-group-description").addClass("has-error");
    		isValid = false;
    	}else{
    		$(".form-group-description").removeClass("has-error");
    		$(".form-group-description").addClass("has-success");
    	}


    	if(isValid){
    		var startup = {
				name: $(event.target).find('[name=name]').val(),
				url: $(event.target).find('[name=url]').val(),
				country: $(event.target).find('[name=location]').val(),
				categories: cList,
				description: $(event.target).find('[name=description]').val(),
			}

			Meteor.call('newStartup', startup, function(error, id) {
				if (error) {
				// display the error to the user
					throwError(error.reason);

					// if the error is that the post already exists, take us there
					// if (error.error === 302) {
					// 	Meteor.Router.to('postPage', error.details)
					// }
				} else {
					Router.go('startups');
				}
			});
    	}	
	}
});



/*******************************
*   Register Funding
******************************/


Template.registerFunding.events({
    'submit form': function(event) {
        event.preventDefault();
        var isValid = true;
        if(!$("#register-name").val() || !Session.get("registerName")){
            $(".form-group-name").removeClass("has-success");
            $(".form-group-name").addClass("has-error");
            isValid = false;
        }else{
            $(".form-group-name").removeClass("has-error");
            $(".form-group-name").addClass("has-success");
        }
        if(!$("#register-date").val()){
            $(".form-group-date").removeClass("has-success");
            $(".form-group-date").addClass("has-error");
            isValid = false;
        }else{
            $(".form-group-date").removeClass("has-error");
            $(".form-group-date").addClass("has-success");
        }
        if($("#register-stage").val() === "Select Funding Stage"){
            $(".form-group-stage").removeClass("has-success");
            $(".form-group-stage").addClass("has-error");
            isValid = false;
        }else{
            $(".form-group-stage").removeClass("has-error");
            $(".form-group-stage").addClass("has-success");
        }
        if($('#checkbox-amount:checked').length === 1 || $("#register-amount").val()){
            $(".form-group-amount").removeClass("has-error");
            $(".form-group-amount").addClass("has-success");
        }else{
            $(".form-group-amount").removeClass("has-success");
            $(".form-group-amount").addClass("has-error");
            isValid = false;
        }
        if($('#checkbox-investors:checked').length === 1 || $("#register-investors").val()){
            $(".form-group-investors").removeClass("has-error");
            $(".form-group-investors").addClass("has-success");
        }else{
            $(".form-group-investors").removeClass("has-success");
            $(".form-group-investors").addClass("has-error");
            isValid = false;
        }

        if(isValid){
            var feed = {
                name: $("#register-name").val(),
                timestamp: moment($("#register-date").val(),"dddd, MMMM Do YYYY").unix(),
                stage: $("#register-stage").val(),
                amount: $("#register-amount").val() ? $("#register-amount").val() : "Undisclosed",
                investors: $("#register-investors").val() ? $("#register-investors").val() : "Undisclosed",
            }

            Meteor.call('newFeed', feed, function(error, id) {
                if (error) {
                // display the error to the user
                    throwError(error.reason);

                    // if the error is that the post already exists, take us there
                    // if (error.error === 302) {
                    //  Meteor.Router.to('postPage', error.details)
                    // }
                } else {
                    Router.go('fundingFeeds');
                }
            });
        }   
    },
});


Template.registerFunding.helpers({
    getNameList: function() {
        return Startups.find({},{sort:{name:1}});
    },

    getAllStages: function(){
        return Stages.find();
    }
});

Template.registerFunding.rendered = function(){

    //Sets the name
    $("#register-name").on("input", function() {
        Session.set("searchText", $("#register-name").val());
        Session.set("registerName",false);
    });

    $("#register-name-list").on("change", function() {
        if($("#register-name-list").val() != "Please Choose One!") {
            Session.set("registerName",true);

            $("#register-name").val($("#register-name-list").val());
        }
    });

    //Sets the Time
    $("#register-date").on("focusout", function() {
        if(moment($("#register-date").val(), "DD/MM/YYYY").isValid()) {
            $("#register-date").val(moment($("#register-date").val(), "DD/MM/YYYY").format("dddd, MMMM Do YYYY"));
        }else{
            $("#register-date").val("");
            $("#register-date").attr("placeholder", "Use the format DD/MM/YYYY");

        }


    });


    //Sets the Amount
    $("#register-amount").on("focusout", function() {

        if(parseFloat($("#register-amount").val())) {
            $("#register-amount").val(parseFloat($("#register-amount").val()));
        }else{
            $("#register-amount").val("");
            $("#register-amount").attr("placeholder","Please enter a valid amount");
        }
    });

    $('#register-amount-check').change(function() {
        if($('#checkbox-amount:checked').length === 1) {
            //Store the amount
            Session.set("registerAmount", $("#register-amount").val());
            $("#register-amount").val("");
            $("#register-amount").attr("placeholder", "Undisclosed");
            $('#register-amount').attr("disabled", "disabled");

        }else{
            $('#register-amount')[0].removeAttribute("disabled");
            if(Session.get("registerAmount")) {
                $("#register-amount").attr("placeholder", Session.get("registerAmount"));
            }else{
                $("#register-amount").attr("placeholder", "Enter Amount in M");
            }
        }
    });

    $('#register-investors-check').change(function() {
        if($('#checkbox-investors:checked').length === 1) {
            //Store the amount
            Session.set("registerInvestors", $("#register-investors").val());
            $("#register-investors").val("");
            $("#register-investors").attr("placeholder", "Undisclosed");
            $('#register-investors').attr("disabled", "disabled");

        }else{
            $('#register-investors')[0].removeAttribute("disabled");
            if(Session.get("registerInvestors")) {
                $("#register-investors").attr("placeholder", Session.get("registerInvestors"));
            }else{
                $("#register-investors").attr("placeholder", "E.g. SPH, Spring, Others");
            }
        }
    });

}









