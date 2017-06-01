	var a=localStorage.getItem("number1");//总人数
	var b=localStorage.getItem("number2");//杀手人数
	var c=localStorage.getItem("number3");//平民人数
	var bArr=JSON.parse(localStorage.getItem("list"));//顺序
//总人数数组
console.log(a,b,c);
console.log(bArr);
//添加盒子
$(document).ready(function(){
	for(var i=0;i<a;i++){
	$(".content").prepend('<div><div></div><div></div></div>');
	// $(".content div").addClass('xxx');
};
});
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
