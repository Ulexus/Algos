Meteor.startup(function(){
	Session.set("duplicationWarning",0);
});

Template.algopedia.events = {
	'submit': function(event,template){
		var name = template.find("input[name=algoName]").value;
		var aid = template.find("input[name=algoID]").value;
		var dupes = getDuplications(name,aid);
		Session.set("duplicationWarning",dupes);
		if(dupes>0){
			event.preventDefault();
			return;
		}
		var desc = template.find("textarea[name=description]").value;
		var pseudo = template.find("textarea[name=pseudocode]").value;
		var algoObject = {
			AiD: aid,
			Name: name,
			Description: desc,
			Pseudo: pseudo
		}
		Meteor.call('uploadDoc',algoObject,Meteor.user().username);
	}
}

Template.algopedia.isDuplicationWarning = function(){
	var warning = Session.get('duplicationWarning');
	return warning!=0;
}

Template.algopedia.getWarning = function(){
	var warning = Session.get('duplicationWarning');
	switch(warning){
		case 1:
			return "Name already exists. Please check for duplicates in database.";
		case 2:
			return "AiD already exists. Please check for duplicates in database.";
		case 3:
			return "AiD and Name match another algorithm. Please check for duplicates in database.";
		default:
			return "Something went horribly wrong. Notifying proper authority.";
	}
}

var getDuplications = function(name,aid){
	var nameCount = AlgoPedia.find({Name:name}).count();
	var aidCount = AlgoPedia.find({AiD:aid}).count();
	if(nameCount>0){
		if(aidCount>0){
			return 3;
		}
		return 1;
	}
	if(aidCount>0){
		return 2;
	}
	return 0;
}
