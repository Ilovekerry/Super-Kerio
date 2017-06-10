	var a=sessionStorage.getItem("number1");//总人数
	var b=sessionStorage.getItem("number2");//杀手人数
	var c=sessionStorage.getItem("number3");//平民人数
	var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
	var steps=sessionStorage.getItem("step");//天数
	var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
	console.log(typeof steps,steps);
	console.log("死掉的人",deadArr);
//总人数数组
var c=parseInt(c);
console.log(a,b,c);
console.log(bArr);
//根据总人数添加盒子
$(document).ready(function(){
	for(var i=0;i<a;i++){
	$(".content").prepend('<div><div></div><img src="images/dagger.png"><div></div></div>');
};
});
//然后添加身份和号数
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
//添加关闭按钮
function close(){
	$(".header-right").click(function(){
		sessionStorage.clear();
		location.href="task2-2.html"
	})
}
//添加hover和点击之后的效果
function hover(){
	$(".content >div").bind("click",function(){
		$(".content >div").find("img").css("display","none")
		$(this).find("img").css("display","inline-flex")
	})
}
//添加死亡角色的背景颜色
function backgroundColor(){
	var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
	console.log(deadArr);
	if (deadArr!==null) {
	for (var i=0;i<deadArr.length;i++){
		var m=deadArr[i];
		$(".content >div").eq(m).find("div").css("background-color","#f8abab")
	}
	}
}
//开始内容
$(document).ready(function(){
	hover();
	close();
	judge();
	backgroundColor();
	var l=judge();
	console.log(l);
	if (l==0) {//杀人页面选择函数
	$(".content >div").click(function(){
		var h=$(this).index().toString(10);
		console.log(h);
		var j=$.inArray(h,deadArr);//判断索引是否属于死亡的数组
		console.log(h,deadArr,j);
        if(j!==(-1)){
			alert("请选择活着的玩家")  
		}
		else if (bArr[h]=="杀手") {
			alert("请选择平民玩家")
		}
		else{
			sessionStorage.setItem("deadPerson",h);
		}
		console.log("kill模式")
	})
	//运行点击确认函数
	$("#next").click(function(){
		nextKill();
	});
}
	else{//投票页面选择函数!!!投票页面在这里
		$(".content >div").click(function(){
			//投票选择目标的函数
			var h=$(this).index();//点击生成索引
			var h=$(this).index().toString(10);
			console.log(h,deadArr);
			var j=$.inArray(h,deadArr);
			console.log(j);
			console.log("vote模式")
	        if(j!==(-1)){
				alert("请选择活着的玩家")
			}
			else{
				sessionStorage.setItem("deadPerson",h);
			}

	})
		$("#next").click(function(){
			nextVote();
		});
	}

})
//判断是杀人还是投票的函数
function judge(){
	var steps=sessionStorage.getItem("step");//读取天数
	var steps=parseInt(steps);//并转换为数字
	var g=(steps-2)%4;
	console.log(g);
	if (g==0) {//修改为杀人页面
		$(".header-middle").text("杀人页面")
		return g;

	}
	else{//修改为投票页面
		$(".header-middle").text("投票");
		$(".nav-top").html("<div></div>发言讨论结束，大家请投票");
		$(".nav-top div").addClass("nav-triangle");
		$(".nav-bottom").text("点击得票数最多的人的头像");
		return g;
	}
}

//杀人之后点击按钮函数
function nextKill(){
		var k=sessionStorage.getItem("deadPerson");
		console.log(k);
		if(k==null){
			alert("请选择一位玩家");
			return;
		}
		else{
			var b=sessionStorage.getItem("number2");//杀手人数
			var c=sessionStorage.getItem("number3");//平民人数
			var c=c-1;
			console.log(b,c);
			if (b==c) {//杀人夜晚只有平民会死
				deadArr.push(k);
				sessionStorage.setItem("deadlist",JSON.stringify(deadArr));
				sessionStorage.setItem("number3",c);
				location.href="task2-7.html"//杀手胜利，游戏结束
			}
			else{
			deadArr.push(k);
			sessionStorage.setItem("deadlist",JSON.stringify(deadArr));
			sessionStorage.setItem("number3",c);
			console.log(deadArr);
			location.href="task2-5.html";
			}

		}


}
//投票之后点击按钮函数
function nextVote(){
	var k=sessionStorage.getItem("deadPerson");
		console.log(k);
		if(k==null){
			alert("请选择一位玩家");
			return;
		}
		else{
			var b=sessionStorage.getItem("number2");//杀手人数
			var c=sessionStorage.getItem("number3");//平民人数
			if (bArr[k]=="平民") {
			var c=c-1;
			}
			else{
				b=b-1;
			}
			console.log(b,c);
			if (b==c||b==0) {

				deadArr.push(k);
				sessionStorage.setItem("deadlist",JSON.stringify(deadArr));
				sessionStorage.setItem("number2",b);
				sessionStorage.setItem("number3",c);
				location.href="task2-7.html"//b==0,平民胜利//b!==0杀手胜利
			}
			else{
			deadArr.push(k);
			sessionStorage.setItem("deadlist",JSON.stringify(deadArr));
			sessionStorage.setItem("number2",b);
			sessionStorage.setItem("number3",c);
			location.href="task2-5.html";
			}

		}

}
