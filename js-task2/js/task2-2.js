function getNumberFunction(){
	var x=document.getElementById("number").value;
	var i=parseInt(x);
	if(i<4||i>18){
		alert("请输入正确的玩家数量");
		return;
	}
	else{
		var k=Math.floor(i/3);
		var w=i-k;
		document.getElementById("killer").innerHTML=k;
		document.getElementById("water").innerHTML=w;
	}
}