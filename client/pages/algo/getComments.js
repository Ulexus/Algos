Template.getComments.comment = function(){
	var getID = Session.get('lsiSelected');
	return Comments.find({Context:getID},{sort:{When:-1}});
}

Template.getComments.commentsExist = function(){
	var getID = Session.get('lsiSelected');
	if(Comments.find({Context:getID}).count()===0){
		return false;
	}
	return true;
}

Template.getComments.getAuthor = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	return user;
}

Template.getComments.getUserName = function(){
	var user = Meteor.users.findOne({_id:this.Contributor});
	if(user===undefined){
		return "Nameless";
	}
	return user.profile.firstname+' '+user.profile.lastname;
}
