	var a=sessionStorage.getItem("number1");//总人数
	var b=sessionStorage.getItem("number2");//杀手人数
	var c=sessionStorage.getItem("number3");//平民人数
//总人数数组
var aArr=[];
for(var i=1;i<=a;i++){
	aArr.push(i);
}
console.log(aArr);
//杀手和平民混合数组
var bArr=[];
//添加杀手
for(var i=1;i<=b;i++){
	bArr.push("杀手");
}
//添加平民
for(var i=1;i<=c;i++){
	bArr.push("平民");

}
console.log(bArr);
//乱序方法
		function shuffle(arr){
    var length =arr.length,
        temp,
        random;
    while(0 != length){
        random = Math.floor(Math.random() * length)
        length--;
        // swap
        temp = arr[length];
        arr[length] = arr[random];
        arr[random] = temp;
    }
    console.log(arr);
    return arr;
}

//

$(document).ready(function(){
//跳转内容
var n=0;
	var result = shuffle(bArr);
		console.log(result);
$("#next").click(function(){
		//代入杀手和平民数组并乱序



		//加入点击次数
	n=n+1;
	console.log(n);
	var m=Math.floor(n/2);
	console.log(m);
	if (n<2*a-1) {
	if (n%2!==0) {
		$("#picture").attr("src","images/girl.png");
		$("#role").text(result[m]);
		$("#next").text("隐藏并传递给"+aArr[m+1]+"号")
		$("#circle").text(aArr[m]);
	}
	else{
		$("#picture").attr("src","images/bear.png");
			$("#role").text("");
			$("#next").text("查看"+aArr[m]+"号身份")
			$("#circle").text(aArr[m]);
	}
	}
	else{
		$("#picture").attr("src","images/girl.png");
		$("#role").text(result[m]);
		$("#next").text("法官查看")
		$("#circle").text(aArr[m]);
	}
	//进入第四个页面
	if (n>=2*a) {
		$(".content-footer a").attr("href","task2-4.html");
		sessionStorage.setItem("list",JSON.stringify(bArr));
	}



	
});
})