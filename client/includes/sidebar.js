Template.sideBar.rendered = function(){
	$(".checkbox-name").on("change", function(){
		if($(".checkbox-name").prop("checked") === true){
			Session.set("sortBy", "name");
			$(".checkbox-stage").prop("checked", false);
			$(".checkbox-date").prop("checked", false);
		}else{
			Session.set("sortBy", undefined);
		}

	});
	$(".checkbox-stage").on("change", function(){
		if($(".checkbox-stage").prop("checked") === true){
			Session.set("sortBy", "stage");
			$(".checkbox-name").prop("checked", false);
			$(".checkbox-date").prop("checked", false);
		}else{
			Session.set("sortBy", undefined);
		}
	});
	$(".checkbox-date").on("change", function(){
		if($(".checkbox-date").prop("checked") === true){
			Session.set("sortBy", "date");
			$(".checkbox-stage").prop("checked", false);
			$(".checkbox-name").prop("checked", false);
		}else{
			Session.set("sortBy", undefined);
		}
	});
}