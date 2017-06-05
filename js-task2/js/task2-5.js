var a=sessionStorage.getItem("number1");//总人数
var b=sessionStorage.getItem("number2");//杀手人数
var c=sessionStorage.getItem("number3");//平民人数
var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
var dead=sessionStorage.getItem("s-role");//死掉的角色
	console.log(a,b,c,bArr,dead);
//下拉
$(document).ready(function(){
	$(".day1").click(function(){
		$(".day1-panel").slideToggle(1000);
	});
//
var order=0;

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
		var x=dead-1+2;
		console.log(x);
		$(".panel-content-kill").after(function(dead){
			return "<div>"+x+"号被杀手杀死，真实身份是平民</div>"
		});
		$(".day1-panel-content >div:nth-child(2)").css({
			"color":"black",
			"font-size":"0.7rem",
			"padding-left":"31px",
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
				return order=1;
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
			return order=2;	
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
			return order=0;
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
});