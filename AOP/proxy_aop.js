//The pattern allows you to create objects with methods that operate on data that isn't visible to 
	//the outside—the very basis of object-oriented programming
	//Proxy Pattern
	(function(){
		//log all calls to setArray
		var proxied = jQuery.fn.setArray;//remember old
		jQuery.fn.setArray = function(){//create new 
			console.log(this,arguments);//aop: add log
			return proxied.apply(this,arguments);//invoke old
		};
	})();
