//获取登陆账号密码js
myApp.controller("loginCtrl",function(loginIn,$state){
		var self=this;
		self.submitForm=function(){
			loginIn.getLoginIn(self.userdata.username,self.userdata.password)
			.then(function(res){
				if(res.data.message=="success"){
					$state.go("home.welcome",{});
				}
				else{					
				self.tip = res.data.message;
				}
			})
		}
	})