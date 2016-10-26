var _ = require("lodash");

var user1 = {
	name:"zhangsan",
	height:180,
	weight:120
};

var user2 = {
	name:"lisi",
	height:180,
	weight:130
};

var user3={
	name:"zhangsan",
	height:180,
	weight:131
};
var users=[user1,user2,user3];

var result = _.find(users,{name:"zhangsan",weight:131});
console.log(result);

var index = _.findIndex(users,{name:'zhangsan',weight:131});
console.log(index);

var result = _.filter(users,{name:'zhangsan'});
var result = _.filter(users,function(user){
	return user.weight > 125;
});

//var result = _.pluck(users,"name");
//console.log(result);
