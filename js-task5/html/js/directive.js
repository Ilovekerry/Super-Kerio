myApp.directive("strange",["$http",function($http){
	return{
		restrict:"E",
		templateUrl:"tpls/example3.html",
		link:function(scope,element){
			console.log("测试");
			$("#newInput").bind("change",uploadFile);
			function uploadFile(){
				var file=this.files[0];
				console.log(file);
				var data=new FormData();
				data.append("file",file);
				$http({
					method:"post",
					url:"/carrots-admin-ajax/a/u/img/task",
					headers:{'Content-Type':undefined},
					data:data
				}).then(function(res){
					console.log(res.data.data.url);
					scope.uploadSrc=res.data.data.url;	
					console.log("wancheng")	
				})
			}
		}
	}
}])