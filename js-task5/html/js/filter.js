//实现过滤器效果
myApp.filter("typeChange", function () {//类型过滤器
    return function (number) {
        switch(number) {
        	case 0: number = "首页Banner"; break;
        	case 1: number = "找职位Banner"; break;
        	case 2: number = "找精英Banner"; break;
        	case 3: number = "行业大图"; break;
        }
        return number;
    }
}); 
myApp.filter("statusChange",function () {//状态过滤器
    return function (type) {
        switch (type){
            case 1:type = "草稿";break;
            case 2:type = "上线";break;
        }
         return type;
    }
});
myApp.filter("statusChange2",function () {//状态过滤器
    return function (type) {
        switch (type){
            case 1:type = "上线";break;
            case 2:type = "下线";break;
        }
         return type;
    }
})    
