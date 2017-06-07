var a=sessionStorage.getItem("number1");//总人数
var b=sessionStorage.getItem("number2");//杀手人数
var c=sessionStorage.getItem("number3");//平民人数
var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
var deadPerson=JSON.parse(sessionStorage.getItem("killList"));//死掉的角色数组
var dead=deadPerson;
var days=sessionStorage.getItem("s-days");//天数
	console.log(a,b,c,bArr,dead,days,deadPerson);
	console.log(dead);

$(document).ready(function(){
	//下拉列表
	$(".day1").click(function(){
		$(this).next("div").slideToggle(1000);
	});
	//关闭按钮清除存储
	$(".header-right").click(function(){
		sessionStorage.clear();
		location.href="task2-1.html"
	})
//根据天数取得数组中的一个数的函数
function diek(a){
	a=deadPerson[a*2-2]
	return a;
}
function diev(a){
	a=deadPerson[a*2-1]
	return a;
}
//定义游戏顺序
var order=0;
//神奇的函数
	function dayOne(t){
//有死亡人数，代表是杀人已经结束
	if(dead!==null){
		$(".panel-content-kill").click(function(){
			alert("请按正确顺序进行游戏");
		});
		//杀人结束，按钮变灰
		$(".panel-content-kill >div:last-child").css({
		"background-color":"grey"
		});
		$(".panel-content-kill div div").css(
				"border-right-color","grey");
		//给出杀人结果
		var t=diek(t)-0+1;
		console.log(t);
		var x=t;
		console.log(x);
		$(".panel-content-kill").after(function(dead){
			return "<div>"+x+"号被杀手杀死，真实身份是平民</div>"
		});
		$(".day1-panel-content >div:nth-child(2)").css({
			"color":"black",
			"font-size":"0.7rem",
			"text-indent":"31px",
			"background-color":"white",
			"justify-content":"flex-start",
			"cursor":"default",
			});
		//亡灵发表遗言
		console.log(order);
	
			$(".panel-content-death").click(function(){
				if (order==0) {
				console.log(order);
				alert("请死者亮明身份并发表遗言");
				$(".panel-content-death >div:last-child").css({
					"background-color":"grey",
					});
				$(".panel-content-death div div").css(
					"border-right-color","grey");
				return order+=1;
				}
		



		else{
			alert("请按正确顺序进行游戏");
		}
		});
		console.log(order);
		//玩家依次发言

		$(".panel-content-talk").click(function(){
			if (order==1) {
			console.log(order);
			alert("玩家依次发言讨论");
			$(".panel-content-talk >div:last-child").css({
				"background-color":"grey",
				});
			$(".panel-content-talk div div").css(
				"border-right-color","grey");
			return order+=1;	
					}
					else{
						alert("请按正确顺序进行游戏");
					}

			});

		//全民投票
		$(".panel-content-vote").click(function(){
			if (order==2) {
			location.href="task2-6.html";
			//表示已经进入投票环节
			sessionStorage.setItem("vote",1);
			return order+=1;
		}
		else{
			alert("请按正确顺序进行游戏");
				}
			});
	



	}
	else{
		//第一轮杀人
		$(".panel-content-kill").click(function(){
			location.href="task2-6.html";

		});
		$(".panel-content-death").click(function(){
			alert("请按正确顺序进行游戏");
		});
		$(".panel-content-talk").click(function(){
			alert("请按正确顺序进行游戏");
		});
		$(".panel-content-vote").click(function(){
			alert("请按正确顺序进行游戏");
		});

	}
	}

	//如果是第一天
if (days==null){
	var t=1;
	dayOne(t);//运行函数1
}
	//进入第二天
	else if(days!==null){
		console.log(days);
		alert("欢迎来到第"+days+"天!");
		$(".body-wrapper").append($(".body-wrapper>div:nth-child(-n+2)").clone(true));
		//运行第一天
		dayOne(1);
		var t=days-1;
		console.log(t);
		var r=diev(t)-0+1;
		console.log(r);
		var x=r;
		console.log(x);
		var y=bArr[x-1];
		console.log(y);
		//加上投票结果
		$(".panel-content-vote").after(function(dead){
			return "<div>"+x+"号被投票投死，真实身份是"+y+"</div>"
		});
		$(".day1-panel-content >div:nth-child(6)").css({
			"color":"black",
			"font-size":"0.7rem",
			"text-indent":"31px",
			"background-color":"white",
			"justify-content":"flex-start",
			"cursor":"default",
			});

	}
});