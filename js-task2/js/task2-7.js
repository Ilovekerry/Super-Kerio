var a=sessionStorage.getItem("number1");//总人数
var b=sessionStorage.getItem("number2");//杀手人数
var c=sessionStorage.getItem("number3");//平民人数
var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
var steps=sessionStorage.getItem("step");//天数
console.log("总人数",a,"杀手人数",b,"平民人数",c);
var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
console.log("死掉的人",deadArr);
console.log("数组顺序",bArr);

//添加关闭按钮
function close(){
	$(".header-right").click(function(){
		sessionStorage.clear();
		location.href="task2-1.html"
	})
	$("#btn1").click(function(){
		sessionStorage.clear();
		location.href="task2.html";
	})
	$("#btn2").click(function(){
		sessionStorage.clear();
		location.href="task2-2.html";
	})
}
//追加天数函数
function day(){
	var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
	var p=Math.ceil(deadArr.length/2);
	console.log("天数",p);
	for(var i=0;i<p;i++){
		var deadArr=JSON.parse(sessionStorage.getItem("deadlist"));
		var r=deadArr[i*2]-0+1;
		console.log("被杀死号数",r);
		var s=deadArr[(i*2)-0+1]-0+1;
		console.log("被 投死者号数",s);
		var bArr=JSON.parse(sessionStorage.getItem("list"));//顺序
		var t=bArr[s-1];
		var q=i-0+1;
		$('.history').append("<div><p>第"+q+"天</p></div>")
		$(".history >div").eq(i).append("<p>黑夜:"+r+"号被杀死了，真实身份是平民</p>")
		$(".history >div").eq(i).append("<p>白天:"+s+"号被投死了，真实身份是"+t+"</p>")
	}
}
//追加结果函数
function win(){
	var b=sessionStorage.getItem("number2");//杀手人数
	if(b==0){
		$(".congratulation").text("太棒了！你知道吗？在杀人游戏中只有80%的平民取得游戏最终的胜利哦！")
		$(".victory-text").text("平民胜利")
	}
	else{
		$(".congratulation").text("太棒了！你知道吗？在杀人游戏中只有20%的杀手取得游戏最终的胜利哦！")
		$(".victory-text").text("杀手胜利")
	}
}





//开始运行
$(document).ready(function(){
	close();
	day();
	win();
})
