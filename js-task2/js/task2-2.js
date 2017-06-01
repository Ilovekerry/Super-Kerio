function getNumberFunction(){
	var x=document.getElementById("number").value;
	var a=parseInt(x);
	var k=Math.floor(a/3);
	var b=parseInt(k);
	var w=a-b;
	var c=parseInt(w);
	var list=new Array(a,b,c);
	if(a<4||a>18){
		document.getElementById("killer").innerHTML="";
		document.getElementById("water").innerHTML="";

	}
	else{
		//避免出现NaN
		if(isNaN(b)){
			return;}
			else{
		document.getElementById("killer").innerHTML=b;
		document.getElementById("water").innerHTML=c;
		}
	}
		return list;
}
function testNumberFunction(){
	var x=getNumberFunction();
	var a=x[0];
	var b=x[1];
	var c=x[2];
	if(x[0]>=4&&x[0]<=18){
		$(".content-footer a").attr("href","task2-3.html");
		localStorage.setItem("number1",a);
		localStorage.setItem("number2",b);
		localStorage.setItem("number3",c);
		
	}
	else{
		alert("请输入正确的玩家数量");
		return;
	}	
}
