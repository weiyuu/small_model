// 闰年
var month_olympic = [31,29,31,30,31,30,31,31,30,31,30,31];
// 平年
var month_normal = [31,28,31,30,31,30,31,31,30,31,30,31];
// 月份
var month_name = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];


// 为各种按键创建变量 
var holder = document.getElementById("days");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar-month");
var cyear = document.getElementById("calendar-year");

// 获取当前日期
var my_date = new Date();
// 获取当前日期的年、月、日
var my_year = my_date.getFullYear(),
    my_month = my_date.getMonth(),
    my_day = my_date.getDate();



//  获取某月第一天是星期几
function dayStart(month, year) {
	var tmpDate = new Date(year, month, 1);
	return tmpDate.getDay();
}

// 判定是否为闰年,并返回月份天数
function daysMonth(month,year) {
    // 闰年标准“能整除4同时不能整除100” 或者“能整除400”
    var tmp = (year % 4 == 0 && year %100 != 0)||(year % 400 == 0);
    if(tmp) {
        return month_olympic[month]
    }else {
        return month_normal[month]
    }
}


// 创建函数生成月份显示
function refreshDate(my_year,my_month,my_day) {
    var str = "";
    var totalDay = daysMonth(my_month,my_year);
    
    var firstDay = dayStart(my_month,my_year);

    var myclass;
    for (var i=0;i<firstDay;i++) {
        str+="<li></li>";
    }
    for(var i=1;i<totalDay;i++){
        if((i<my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()) || my_year<my_date.getFullYear() || ( my_year==my_date.getFullYear() && my_month<my_date.getMonth())){ 
			myclass = " class='lightgrey'"; //当该日期在今天之前时，以浅灰色字体显示
		}else if (i==my_day && my_year==my_date.getFullYear() && my_month==my_date.getMonth()){
			myclass = " class='green greenbox'"; //当天日期以绿色背景突出显示
		}else{
			myclass = " class='darkgrey'"; //当该日期在今天之后时，以深灰字体显示
		}
		str += "<li"+myclass+">"+i+"</li>"; //创建日期节点
    }
    holder.innerHTML = str;
    ctitle.innerHTML = month_name[my_month];
    cyear.innerHTML = my_year;
}
refreshDate(my_year,my_month,my_day);


prev.onclick = function(event) {
    event.preventDefault();
    my_month-=1;
    if(my_month < 0) {
        my_year-=1;
        my_month = 11;
    }
    refreshDate(my_year,my_month,my_day);
}

next.onclick = function(event) {
    event.preventDefault();
    my_month+=1;

    if( my_month >11) {
        my_year+=1;
        my_month=0;
    }
    refreshDate(my_year,my_month,my_day)
}

