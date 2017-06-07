	var a=sessionStorage.getItem("number1");//总人数
	var b=sessionStorage.getItem("number2");//杀手人数
	var c=sessionStorage.getItem("number3");//平民人数
	var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
	var days=sessionStorage.getItem("s-days");//天数
	var livePeople=[];//活着的数组
	var deadPeople=[];//死掉的数组
	var target=1000;	//定义被投死者的号数
	var role=1000;	//定义被杀死者的号数
	var deadPerson=JSON.parse(sessionStorage.getItem("killList"));//死掉的角色数组
	//判断是否属于死掉的数组
	function stillAlive(a){
		var result=$.inArray(a,deadPerson);
		return result;
	}
//总人数数组
console.log(a,b,c);
console.log(bArr);
//添加盒子
$(document).ready(function(){
	for(var i=0;i<a;i++){
	$(".content").prepend('<div><div></div><img src="images/dagger.png"><div></div></div>');
	// $(".content div").addClass('xxx');
};
});
//输入角色身份和号数信息
$(document).ready(function(){
	var x=$(".content>div div:first-child");
	var y=$(".content>div div:last-child");
	console.log(x);
	for(var i=0;i<a;i++){	
		console.log(x[i]);
		$(x[i]).html(bArr[i]);
		$(y[i]).html(i+1+"号");	
};
});

//开始
$(document).ready(function(){
//点击关闭按钮关闭清除存储
$(".header-right").click(function(){
	sessionStorage.clear();
	location.href="task2-1.html"
})
//更改背景颜色，代表死亡
var people=$(".content >div");
var y;
if (deadPerson!=null) {
	for(i=0;i<deadPerson.length;i++){
		var y=deadPerson[i];
		$(people[y]).find("div").css("background-color","#f8abab")
		console.log(y);
	}
}
console.log(people);

//获得投票开始状态
var start=sessionStorage.getItem("vote");
console.log(start);
//判断是否已进入投票环节
//是
if (start==1) {
	//获得死者号数
	console.log(deadPerson);
	var dead=deadPerson[deadPerson.length-1];//死掉的号数
	console.log("死者下标"+dead);
//修改页面为投票页面
	$(".header-middle").text("投票");
	$(".nav-top").html("<div></div>发言讨论结束，大家请投票");
	$(".nav-top div").addClass("nav-triangle");
	$(".nav-bottom").text("点击得票数最多的人的头像");
	//选择目标时的效果
	$(".content>div").bind("click",function(){
		$(".content img").css("display","none");
		$(this).find("img").css("display","inline-flex");
	});
	//投票选择目标
	$(".content>div").bind("click",function(){
		target=$(this).index();
		console.log(target);
		if(stillAlive(target)!==-1){
			alert("这个人已经死了，我们还是放过他吧");
		};
		return target;
		});
//按钮直接点击也能跳转
	//点击按钮判断
	$("#next").click(function(){
		//投票结果分析

		//判断是否投票了死者
		if (stillAlive(target)!==-1) {
			alert("这个人已经死了，我们还是放过他吧");
			location.href="#";
		}
		//判断杀手平民数量
		else if(bArr[target]=="杀手"){
			b=b-1;
			console.log(b);
			return b;
		}
		else{
			c=c-1;
			console.log(c);
			return c;
		};
		});
	$("#next").click(function(){
		console.log(b,c);
		console.log(target);
		if (target==1000) {
			alert("请选择一位活着的玩家进行投票")
		}
		else if (stillAlive(target)!==-1) {
			location.href="#";
		}
		//判断是否游戏结束
		else if(b==0||b==c){
			alert("游戏结束");//进入游戏结束页面
		}
		else{
			//存储数据，进入第二天
			var deadPeople=deadPerson;
			deadPeople.push(target);
			console.log(deadPeople);
			sessionStorage.setItem("killList",JSON.stringify(deadPeople));
			console.log(target);
			if (days==null) {
				var days=2;
				sessionStorage.setItem("s-days",days)
				console.log(days);
			}
			else{
				days+=1;
				sessionStorage.setItem("s-days",days);
				console.log(days);
			}
			location.href="task2-5.html";
		}

	});

	}



//非投票环节
else{
	//选择目标时的效果
	$(".content>div").bind("click",function(){
		$(".content img").css("display","none");
		$(this).find("img").css("display","inline-flex");
		//杀手选择目标
		role=$(this).index();
		if(bArr[role]=="杀手"){
			alert("请选择一位平民");
		}
		console.log(role);
		return role;
		});
	//点击确认按钮时的判断
		$('#next').click(function(){
			//如果目标是杀手自己
			if(role==1000){
				alert("请选择一位活着的平民")
			}
			else if(bArr[role]=="杀手"){
				alert("请选择一位平民");
			}
			else if (stillAlive(role)!==-1) {
				alert("请选择一位活着的玩家");
			}
			else if(b==c-1){
				alert("游戏结束");//进入游戏结束页面
			}
			else{
				//存储死者的号数
				
				deadPeople.push(role);
				sessionStorage.setItem("killList",JSON.stringify(deadPeople));
				console.log(role);
				location.href="task2-5.html";
			};
		});

}




});
