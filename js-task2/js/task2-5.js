	var a=sessionStorage.getItem("number1");//总人数
	var b=sessionStorage.getItem("number2");//杀手人数
	var c=sessionStorage.getItem("number3");//平民人数
	var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
	var steps=sessionStorage.getItem("step");//天数
	console.log("步骤",steps);
	var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
	console.log("死掉的人",deadArr);
	console.log(bArr);
//下拉函数
function fold(){
	$(".day1").click(function(){
		$(this).next().slideToggle(1000);
	})
}
//关闭清除存储函数
$(document).ready(function(){
	$(".header-right").click(function(){
		sessionStorage.clear();
		location.href="task2-2.html"
	})
})
//每次进入页面都需要进行判断步骤函数
function judge(){
	var steps=sessionStorage.getItem("step");
if(steps==null&&steps<1){//如果steps为空
	var steps=1;//给steps赋值
	sessionStorage.setItem("step",steps);//并保存
	var steps=sessionStorage.getItem("step");//读取天数
	console.log(steps);	
}
}

//任何时候都可以运行折叠下拉函数//正式开始了！！！
$(document).ready(function(){
	fold();
	judge();
	kill();
	death();
	talk();
	vote();
	clone();
	change();
	add();
	grey();
	slide();
})
//杀人函数
function kill(){
$(".panel-content-kill").click(function (){
	var steps=sessionStorage.getItem("step");//读取天数
	var steps=parseInt(steps);
	console.log(steps);
	var a=(steps-1)/4;
	console.log(a);
	var b=$(".panel-content-kill").length;
	var f=$(this).index(".panel-content-kill")
	console.log(b);
	if (a==b-1&&f==b-1){
		var steps=parseInt(steps);
		var steps=steps+1;
		sessionStorage.setItem("step",steps);
		location.href="task2-6.html";
	}
	else{
		alert("请按顺序进行游戏")
	}
})
}
//遗言函数
function death(){
	$(".panel-content-death").click(function (){
		var steps=sessionStorage.getItem("step");//读取天数
		var steps=parseInt(steps);
		console.log(steps);
		var a=(steps-2)/4;
		console.log(a);
		var b=$(".panel-content-death").length;
		var f=$(this).index(".panel-content-death")
		console.log(b);
		if (a==b-1&&f==b-1){
			var steps=parseInt(steps);
			var steps=steps+1;
			sessionStorage.setItem("step",steps);
			alert("死者请发言")
			grey();
		}
		else{
			alert("请按顺序进行游戏")
		}
	})
}
//讨论函数
function talk(){
	$(".panel-content-talk").click(function (){
		var steps=sessionStorage.getItem("step");//读取天数
		var steps=parseInt(steps);
		console.log(steps);
		var a=(steps-3)/4;
		console.log(a);
		var b=$(".panel-content-talk").length;
		var f=$(this).index(".panel-content-talk")
		console.log(b);
		if (a==b-1&&f==b-1){
			var steps=parseInt(steps);
			var steps=steps+1;
			sessionStorage.setItem("step",steps);
			alert("玩家发言讨论")
			grey();
		}
		else{
			alert("请按顺序进行游戏")
		}
	})
}
//投票函数
function vote(){
$(".panel-content-vote").click(function (){
	var steps=sessionStorage.getItem("step");//读取天数
	var steps=parseInt(steps);
	console.log(steps);
	var a=(steps-4)/4;
	console.log(a);
	var b=$(".panel-content-vote").length;
	var f=$(this).index(".panel-content-vote")
	console.log(b);
	if (a==b-1&&f==b-1){
		var steps=parseInt(steps);
		var steps=steps+1;
		sessionStorage.setItem("step",steps);
		location.href="task2-6.html";
	}
	else{
		alert("请按顺序进行游戏")
	}
})
}
//克隆函数
function clone(){
	var steps=sessionStorage.getItem("step");//读取天数
	var steps=parseInt(steps);
	console.log(steps);
	if ((steps-1)%4>=0) {
	var t=Math.ceil(steps/4)-1;
	console.log(t);
	for(var i=0;i<t;i++){
	$(".body-wrapper").append($(".body-wrapper div:lt(2)").clone(true));
	}
}
}
//追加天数文字的函数

function change(){
	var arr =["一","二","三","四","五","六","七","八"]
	for(var i=0;i<8;i++){
	$(".date").eq(i).text(arr[i])		
	}
}
//追加内容 包括身份和死亡的号数
function add(){
	var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
	var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
	console.log(deadArr);
	var r=steps
	console.log(r);
	if (r>=2) {
	for(var i=0;i<8;i=i+2){
	var p=deadArr[i]-0+1;
		console.log(p);
		if(isNaN(p)){
			console.log("……");
		}
		else{
	var w=i/2;
	$(".panel-content-kill").eq(w).after("<div>"+p+"号被杀手杀死，真实身份是平民</div>")
	$(".panel-content-kill").eq(w).next("div").css({
		"color":"black",
		"font-size":"0.7rem",
		"text-indent":"31px",
		"background-color":"white",
		"justify-content":"flex-start",
		"cursor":"default",
	})
	}
	}
}
 if(r>=5){
	for(var i=1;i<8;i=i+2){
	var q=deadArr[i]-0+1;
	var v=(i-1)/2;
	var s=bArr[q-1];
	console.log(i,"数组下标")
	console.log(s);
			console.log(q);
		if (isNaN(q)) {
			return;
		}
		else{
	var v=(i-1)/2;
	$(".panel-content-vote").eq(v).after("<div>"+q+"号被投票投死,真实身份是"+s+"</div>")
	$(".panel-content-vote").eq(v).next("div").css({
		"color":"black",
		"font-size":"0.7rem",
		"text-indent":"31px",
		"background-color":"white",
		"justify-content":"flex-start",
		"cursor":"default",
	})
	}
	}
}
}
//追加经过的步骤的颜色
function grey(){
	var steps=sessionStorage.getItem("step");//天数
	if (steps>=2){
		var w=steps-2;
		console.log(w);
		for(var i=0;i<=w;i++){
			$(".panel-text").eq(i).css("background-color","grey");
			$(".panel-content-triangle").eq(i).find("div").css("border-right-color","grey");
		}
	}
}
function slide(){//折叠函数
	var steps=sessionStorage.getItem("step");//天数
	if (steps>4){
		u=Math.ceil(steps/4)-1;
		console.log(u);
		for(var i=0;i<u;i++){
			$(".day1-panel").eq(i).css("display","none");
		}
	}
}