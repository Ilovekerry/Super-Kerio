//练习的服务
myApp.service("getList",["$http","$q",function($http,$q){
	var getList={};
	this.url="/carrots-admin-ajax/a/article/search";
	var clear=this;
	getList.getMainList=function(){
		var defered=$q.defer();
		$http.get(clear.url)
		.then(function(res){
			defered.resolve(res);
		})
		return defered.promise;
	}
	return getList;	
}]);
//登录模块的服务
myApp.factory("loginIn",["$http","$q",function($http,$q){
	var loginIn={};
	this.url="/carrots-admin-ajax/a/login";
	var login=this;
	loginIn.getLoginIn=function(a,b){
		var defered=$q.defer();
		$http({
			method:"POST",
			url:login.url,
			params:{
				name:a,
				pwd:b
			}
		})
		.then(function(res){
			defered.resolve(res);

		})
		return defered.promise;
	}
	return loginIn;
}])