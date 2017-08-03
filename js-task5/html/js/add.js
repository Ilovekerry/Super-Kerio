//上传文件controller
myApp.controller("addCtrl",function($scope,$http,$state,$stateParams,myFactory){
	console.log($stateParams.id);
	function readFile(){ 
	    var file = this.files[0]; //读取文件信息
	$scope.imgName=file.name;//名字
	$scope.imgSize=(Math.ceil((file.size) / 1024) / 1024).toFixed(2)+"MB";//大小
	$scope.uploadPicture="true";//显示图片信息栏
	$scope.$apply()
	}
	function uploadFile(){//上传图片函数
		console.log("运行了上传图片函数")
		var data=new FormData();
		var file=document.querySelector("input[type=file]").files[0];
		data.append("file",file);
		$http({
			method:"post",
			url:"/carrots-admin-ajax/a/u/img/task",
			headers:{'Content-Type':undefined},
			uploadEventHandlers: {
			      progress: function(e) {
			          $scope.progressValue=e.loaded / e.total;
			      }
			  },
			  data:data
		}).then(function success(res){//读取服务器反馈信息
			console.log(res.data.data.url);
			$scope.imageSrc=res.data.data.url;//读取图片url地址
			$scope.check="success";			
		})
	}
	function DeleteFile(){
		$scope.progressValue=0;//清空进度条
		$scope.check="failed";//清空状态栏
		$scope.uploadPicture="false";//隐藏图片信息栏
		document.getElementById("uploadPicture").value="";
		console.log("运行了删除函数")
		
	}
	if(typeof($stateParams.id)=="string"){//检测是否进入id页面
		$scope.editTitle="编辑Article";//修改页面文字
		getArticle($stateParams.id);
		function getArticle(b){
			console.log(b);
			$http({
				method:"get",
				url:"/carrots-admin-ajax/a/article/"+b,				
			}).then(function(res){
				console.log(res);
				// $scope.type=res.data.data.article.type;
				$scope.type=JSON.stringify(res.data.data.article.type);
				$scope.title=res.data.data.article.title;
				$scope.content=res.data.data.article.content;
				$scope.url=res.data.data.article.url;
				$scope.imageSrc=res.data.data.article.img;
				$scope.title=res.data.data.article.title;
				$scope.createAt=res.data.data.article.createAt;
				if($scope.type==3){
				$scope.industry=JSON.stringify(res.data.data.article.industry);	
				}
				var E = window.wangEditor;
				var editor = new E('#editor');
				// 或者 var editor = new E( document.getElementById('#editor') )
				editor.create();
				editor.txt.html($scope.content);	
			})
		}
		var input = document.getElementById("uploadPicture");
		//文件域选择文件时, 执行readFile函数
		input.addEventListener('change',readFile,false);

		$scope.UploadFile=function(){//点击图片上传按钮
			uploadFile();
		}
		$scope.DeleteFile=function(){//点击删除图片按钮
			DeleteFile();
		}
		$scope.online=function(b){
			console.log("运行了上传函数")
			var E = window.wangEditor
			var editor = new E('#editor')
			// 或者 var editor = new E( document.getElementById('#editor') )
			function Trim(str){ 
		 return str.replace(/(^\s*)|(\s*$)/g, ""); //修剪掉空格
			}
			editor.create();

			var word=editor.txt.text();
			$scope.content=Trim(word);
			
			$scope.status=b;
			console.log(typeof $scope.type);
			
			console.log($scope.imageSrc);
			$scope.status=JSON.parse($scope.status);
			$scope.type=JSON.parse($scope.type);

			console.log($scope.imageSrc);
			console.log(typeof $scope.status)
			console.log(typeof $scope.type)
			console.log($scope.status,$scope.type,$scope.title,$scope.url,$scope.industry,$scope.content,$scope.createAt);
			$http({
				method:"PUT",
				url:"/carrots-admin-ajax/a/u/article/"+$stateParams.id,
				header:{ "Content-Type": "application/x-www-form-urlencoded"},
				params:{
				    title:$scope.title,
				    status:2,
				    type:$scope.type,
				    img: $scope.imageSrc,
				    content:$scope.content,
				    url:$scope.url,
				    industry:$scope.industry,
				    createAt:$scope.createAt,
				}
			}).then(function success(res){
				console.log(res);
				myFactory.setBackfrom(2);
			$state.go("home.articleList");
				
			})
		}
	}
	else{//进入新增页面
		$scope.editTitle="新增Article";//修改页面文字
	var input = document.getElementById("uploadPicture");
	//文件域选择文件时, 执行readFile函数
	input.addEventListener('change',readFile,false);
	$scope.UploadFile=function(){//点击图片上传按钮
		uploadFile();
	}
	$scope.DeleteFile=function(){//点击删除图片按钮
		DeleteFile();
	}
	$scope.online=function(b){
		online(b);
	}
	function online(b){
		console.log("运行了上传函数")
		$scope.status=b;
		console.log(typeof $scope.type)
		
		console.log($scope.imageSrc);
		$scope.status=parseInt($scope.status);
		$scope.type=parseInt($scope.type);
		console.log($scope.status,$scope.type,$scope.title,$scope.url,$scope.industry,$scope.content);
		$http({
			method:"post",
			url:"/carrots-admin-ajax/a/u/article",
			params: {
				type: $scope.type,
				status: $scope.status,
				title: $scope.title,
				url: $scope.url,
				industry: $scope.industry,
				content: $scope.content,
				img: $scope.imageSrc
				
			},
			headers:{'Content-Type':undefined}
		}).then(function success(res){
			console.log(res);
			// $scope.modalText="新增";
			// $("#myModal3").modal("show");
			myFactory.setBackfrom(1);
			$state.go("home.articleList",{});			
		})
	}
}
})