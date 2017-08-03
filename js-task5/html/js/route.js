myApp.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/login");
	$stateProvider.state("login",{
				url:"/login",
				templateUrl:"tpls/login.html"
			}
	)
	.state("home",{
		url:"/home",
		templateUrl:"tpls/home.html"
	}
	)
	.state("home.welcome",{
		url:"/welcome",
		templateUrl:"tpls/welcome.html"
	})
	.state("home.articleList",{
		url:"/articleList?size&page&type&status&startAt&endAt",
		templateUrl:"tpls/articleList.html",
		params:{
		    type: "",
		    status: "",
		    startAt: "",
		    endAt: ""
		}
	})
	.state("home.add",{
		url:"/add?id",
		templateUrl:"tpls/add.html"   
	})
	.state("home.example",{
		url:"/example",
		templateUrl:"tpls/example.html"
	})
	.state("home.example2",{
		url:"/example2",
		templateUrl:"tpls/example2.html"

	})

});