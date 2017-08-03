//获取列表信息数据
myApp.controller("listCtrl",function($scope,$http,$filter,$state,$stateParams,myFactory){
	console.log("刷新了页面")
	search2($stateParams);
	//页面加载时运行清楚并请求函数
	$scope.clearSearch=function(){//点击清除按钮运行清除并请求函数
		clearSearch();	
	}

  	$scope.listSearch=function(pa){
  		search(pa);
  	};
  	$scope.delete=function(b){
  		console.log("准备删除"+b);
  		$scope.fileId=b;
  	};
  	$scope.deleteSure=function(b){//确认删除
  		if(b==1){
  			$http.delete("/carrots-admin-ajax/a/u/article/"+$scope.fileId).then(function(res){
  				console.log("删除成功")
  				search2($stateParams);
  			})
  		} 		
  	}
  	$scope.offline=function(a,b){
  		console.log(a,b);
  		$scope.fileId2=b;
  		$scope.fileStatus=a;
  		if($scope.fileStatus==1){
  			$scope.modalText="上线"
  			$scope.modalText2=""
  		}
  		else{
  			$scope.modalText="下线"
  			$scope.modalText2="不"
  		}
  	}
  	$scope.uploadSure=function(b){
  		if($scope.fileStatus==1){
  			$scope.fileStatus=2;
  			if(b==1){
  				upload();
  			}
  		}
  		else{
  			$scope.fileStatus=1;
  			if(b==1){
  				upload();
  			}
  		}	
  	}
  	function upload(){
  		console.log("运行了改变状态函数")
  		$http({
  			method:"put",
  			url:"/carrots-admin-ajax/a/u/article/status",
  			params:{
  				id:$scope.fileId2,
  				status:$scope.fileStatus
  			}
  		}).then(function(res){
  			console.log("状态改变成功")
  			search2($stateParams);
 			$("#myModal3").modal("show");//输出上线成功和下线成功

  		})
  	}
function search2($stateParams){
	console.log("运行了search2");
	$http({//请求
		method:"GET",
		url:"/carrots-admin-ajax/a/article/search",
		params:{
			size:$stateParams.size,
			page:$stateParams.page,
			startAt:$stateParams.startAt,
			endAt:$stateParams.endAt,
			type:$stateParams.type,
			status: $stateParams.status
		}		
	}).then(function(list){//获取对象
		console.log("这里运行了吗")
		$scope.list=list;
		console.log(list);
		$scope.items=list.data.data.articleList;//获取列表内容
		$scope.total=list.data.data.total;//总共数量
		$scope.pageNumber2=list.data.data.page;//当前的页数
		$scope.listNumber=list.data.data.size;
		var w=Math.ceil(list.data.data.total / $scope.listNumber);//计算出页数
		$scope.totalPage=w;
		$stateParams.page=$stateParams.page;
		if($stateParams.page>$scope.totalPage){
			console.log("大于")
			$stateParams.page=$scope.totalPage;
			search($stateParams.page);
		}
		else{


		var newPages=new Array();//生成页数数组
		for(i=1;i<=w;i++){
			newPages.push(i);
		}
		pa=$scope.pageNumber2
		if(pa<=3||w<6){
			pages=newPages.slice(0,5)

		}
		else if(pa+3>w){
			pages=newPages.slice(w-5,w)

		}
		else{
			pages=newPages.slice(pa-3,pa+2);

		}
		console.log(pa,$scope.pageNumber)
		$scope.listPages=pages;//页数数组
		$scope.pageNumber="";

		console.log("输出了结果");
		$scope.where=myFactory.getBackfrom();
		if($scope.where==1){
			blue();
			myFactory.setBackfrom();//清空服务存储
		}
		else if($scope.where==2){
			red();
			myFactory.setBackfrom();//清空服务存储
		}
		
		//
		function red(){
			$scope.modalText="编辑";
			$("#myModal3").modal("show");
			
		}
		function blue(){
			$scope.modalText="新增";
			$("#myModal3").modal("show");
			
		}
		//
		}
	});	
	$scope.type=$stateParams.type;
	$scope.status=$stateParams.status;
	$scope.startAt=$stateParams.startAt;
	$scope.endAt=$stateParams.endAt;
	$scope.startAt=$filter('date')($stateParams.startAt,"yyyy-MM-dd");
	$scope.endAt=$filter('date')($stateParams.endAt,"yyyy-MM-dd");
	console.log($scope.startAt,$scope.endAt);
	console.log($stateParams);
}
function clearSearch(){//清除并请求函数
	console.log("运行了clearSearch函数")
		$scope.startAt="";
		$scope.endAt="";
		$scope.type="";
		$scope.status="";
		$scope.listNumber=10;
		$scope.pageNumber2=1;
		$http({
			method:"GET",
			url:"/carrots-admin-ajax/a/article/search",
			params:{
				size:$scope.listNumber,
				page:$scope.pageNumber2,
			}	
		}).then(function(list){

			$scope.items=list.data.data.articleList;//获取列表内容
			$scope.total=list.data.data.total;
			
			console.log(Math.ceil(list.data.data.total / $scope.listNumber));
			var x=Math.ceil(list.data.data.total / $scope.listNumber);
			$scope.totalPage=x;
			console.log(list.data.data.total);//计算页数
			var newPages=new Array();
			for(i=1;i<=x;i++){
				newPages.push(i);
			}
			pages=newPages.slice(0,5);
			console.log(pages);
			$scope.listPages=pages;
			console.log("输出了结果")
			$state.go("home.articleList",{size:$scope.listNumber,page:$scope.pageNumber2,
				type:$scope.type,status:$scope.status,startAt:$scope.startAt,endAt:$scope.endAt});		
		});	
	}
function search(pa){//点击搜索按钮运行搜索函数
	console.log("运行了search函数")
  		 $scope.startAt=$("#calendar1").val();//解决ng-model无法获取日期插件的值的问题
  		 $scope.endAt=$("#calendar2").val();
  		 var dateStart=Date.parse($scope.startAt);
  		var dateEnd=Date.parse($scope.endAt);
  		
  		if(isNaN(dateStart)){//判断是否为空，如果nan转换为空
  			dateStart="";
  		}
  		if(isNaN(dateEnd)){
  			dateEnd="";
  		}
  		if(!isNaN(parseInt(pa))){//判断是否点击了页数
  			console.log("点击了页数按钮")
	$scope.pageNumber2=pa;	
}else{
	console.log("没有点击页数按钮")
	console.log($scope.pageNumber)
	if(parseInt($scope.pageNumber)==0){
		$scope.pageNumber2=1;

	}
	else{
		$scope.pageNumber2=$scope.pageNumber;
		console.log($scope.pageNumber2)
	}
}

$state.go("home.articleList",{size:$scope.listNumber,page:$scope.pageNumber2,
		type:$scope.type,status:$scope.status,startAt:dateStart,endAt:dateEnd});	
	}
});