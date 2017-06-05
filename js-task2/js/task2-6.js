	var a=sessionStorage.getItem("number1");//总人数
	var b=sessionStorage.getItem("number2");//杀手人数
	var c=sessionStorage.getItem("number3");//平民人数
	var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
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

//投票环节开始
$(document).ready(function(){
//获得死者号数
var dead=sessionStorage.getItem("s-role");//死掉的号数
console.log("死者号数"+dead);
//定义被投死者的号数
var target;
//定义生死
var live=0;
//获得投票开始状态
var start=sessionStorage.getItem("vote");
console.log(start);
//判断是否已进入投票环节，如果是，修改页面为投票页面
if (start==1) {
	$(".header-middle").text("投票");
	$(".nav-top").html("<div></div>发言讨论结束，大家请投票");
	$(".nav-top div").addClass("nav-triangle");
	$(".nav-bottom").text("点击得票数最多的人的头像");
	//更改背景颜色，代表死亡
	var people=$(".content >div div");
	console.log(people);
	$(people[dead]).css("background-color","#f8abab");
	//选择目标时的效果
	$(".content>div").bind("click",function(){
		$(".content img").css("display","none");
		$(this).find("img").css("display","inline-flex");
	});
	//投票选择目标
	$(".content>div").bind("click",function(){
		target=$(this).index();
		console.log(target);
		console.log(dead);
		if(target==dead-1){
			alert("这个人已经死了，我们还是放过他吧");
		};
		});

	//点击按钮判断
	$("#next").click(function(){
		//投票结果分析
		//判断是否投票了死者
		if (target==dead-1) {
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
		console.log(b,c)
		//判断是否游戏结束
		if(b==0||b==c){
			alert("游戏结束");//进入游戏结束页面
		}
		else{
			//存储数据，进入第二天
			sessionStorage.setItem("dead",target)
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
		console.log(role);
		});
		$('#next').click(function(){
			//如果目标是杀手自己
			if(bArr[role]=="杀手"){
				alert("请选择一位平民");
			}
			else if(b==c-1){
				alert("游戏结束");//进入游戏结束页面
			}
			else{
				//存储死者的号数
				sessionStorage.setItem("s-role",role);
				console.log(role);
				location.href="task2-5.html";
			};
		});

}




});
