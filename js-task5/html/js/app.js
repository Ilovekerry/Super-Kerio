
//路由app
var myApp=angular.module('myApp',['ui.router','angularFileUpload','oc.lazyLoad']);


//存储数据的服务
myApp.factory("myFactory",function(){
	var service={};
	var backfrom;//定义从哪个页面回来;1代表新增，2代表编辑。
	service.setBackfrom=function(newBackfrom){
		backfrom=newBackfrom;
	}
	service.getBackfrom=function(){
		return backfrom;
	}
	return service;
})
//jquery动画效果
//点击折叠函数
myApp.controller("homeCtrl",function(){

	fold();
	miniFold();
	function fold(){
		$(".list-title1").click(function(){
			$(".list-content1").toggle()
			$(".list-content2").hide()
			$(".list-content3").hide()
		})
		$(".list-title2").click(function(){
			$(".list-content2").toggle()
			$(".list-content1").hide()
			$(".list-content3").hide()
		})
		$(".list-title3").click(function(){
			$(".list-content3").toggle()
			$(".list-content2").hide()
			$(".list-content1").hide()
		})
		//点击切换border//
		$(".list-title").click(function(){
			if($(this).css("border-color")==="rgb(255, 255, 255)"){
				$(".list-title").css("border-color","#232a3a");
				$(".list-title").find(".glyphicon-chevron-left").css("transform","rotate(0deg)")
			}
			else{
			$(".list-title").css("border-color","#232a3a");
			$(this).css("border-color","white")
			$(".list-title").find(".glyphicon-chevron-left").css("transform","rotate(0deg)")
			$(this).find(".glyphicon-chevron-left").css("transform","rotate(-90deg)")
			}
		})
		//点击改变背景色
		$(".list-wrapper>div").click(function(){
			$(".list-wrapper>div").css("background-color","#232a3a")
			$(this).css("background-color","grey")
		})
	}
	function miniFold(){
		$(".header-button").click(function(){
			$(".content-left").slideToggle(500)
		})
	}
})
//自定义指令练习
myApp.directive("lastLine",[function(){
	return{
		restrict:"EA",
		templateUrl:"tpls/add2.html",
		replace:true,
		
	}
}])
myApp.controller("exampleCtrl",["getList",function(getList){
	var self=this;
	clear();
 	function clear(){
 		getList.getMainList().then(function(res){
 			self.items=res.data.data.articleList;
 		});
 	}
}])
myApp.controller("testCtrl",function(){
	var self=this;
})
