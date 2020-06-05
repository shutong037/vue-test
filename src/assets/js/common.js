let yearTime = '';

function setYearTime (){
	let time = new Date();
	let year = time.getFullYear();
	let month = time.getMonth()+1;
	let date = time.getDate();
	let hour = time.getHours();
	let minute = time.getMinutes();
	let second = time.getSeconds();
	let day = time.getDay();
	yearTime =  [year,month,date,hour,minute,second,day];
	return yearTime;
} 

//用户设备判断
function isMobile(){
	let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i);
	return flag === null? [true,'pc端']: [false,'移动端'];
}

export default{
	//用户设备
	Device: isMobile(),
	Base64 :require('js-base64').Base64,
	//日期返回
	yearTime : setYearTime(),
	//号码验证
	expreg : /^1(3|4|5|6|7|8|9)\d{9}$/,
	//星期返回
	GetDateStr: function (AddDayCount) {
		let time = new Date();
		time.setDate(time.getDate()+AddDayCount);
		let MM = time.getMonth()+1;
		let dd = time.getDate();
		return  [MM,dd];
	},
	//按钮日期
	addMonthDate: function(){
		let h = yearTime[3];
		let days = "";
		if(yearTime[6] == 6){
			days = this.GetDateStr(2);
		}else if(yearTime[6] == 0){
			days = this.GetDateStr(1);
		}else{
			if(h < 15){
				days = this.GetDateStr(0);
			}else{
				if(yearTime[6] == 5 && h >= 15){
					days = this.GetDateStr(3);
				}else{
					days = this.GetDateStr(1);
				}
			}
		}
		//假期判断
		if(days[0] == 1){
			if(days[1] == 1){
				days[1] = 2;
			}else if(days[1] >=24 && days[1] <= 31){
				days[0] = 2;
				days[1] = 3;
			}
		}else if(days[0] == 4){
			if(days[1] == 4 || days[1] == 5 ||days[1] == 6){
				days[1] = 7;
			}
		}else if(days[0] == 5){
			if(days[1] <= 5){
				days[1] = 6;
			}
		}else if(days[0] == 6){
			if(days[1] == 25 || days[1] == 26 || days[1] == 27|| days[1] == 28){
				days[1] = 29;
			}
		}else if(days[0] == 10){
			if(days[1] <= 8){
				days[1] = 9;
			}
		}
		return  days[0] + "月" + days[1] +"日";
	},
	//返回保存号码的请求地址
	whichSaveApi: function(){
		let save = {
			url: '/api/saveCode'
		}
		return save
	},
	//获取url中的参数
	getUrlKey: function(name) {
		let urlName = "";
		if(name == 'stockno'){
			urlName = '000002';
		}else{
			urlName = decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || ["", ""])[1].replace(/\+/g, '%20')) || null;
		}
		return urlName
	},
	// 跳转到结果页
	goLinkPage: function(pageInfo){
		let  phoneNum = this.Base64.encode(pageInfo.phoneNum);
		let  isM = '';
		let  url = window.location.href;
		let  reg = /\/m\/|\/n\/|\/mn\//;
		let  pingfen = '';
		let  f = '';
		let  givenInfo = ''; //特定信息
		let  reportTxt = ''; //按钮信息
		let  reportNum = ''; //按钮类型
		let  isMore = '&isMore=1';//是否展示持仓和资金量
		let  isServe = '&isServe=1';//是否展示持仓和资金量
		let  pageNameP1 = "zgp"; //默认pc端诊股结果页
		let  pageNameP2 = "jgp"; //默认pc端荐股结果页
		let  pageNameM1 = "zgm"; //默认移动端诊股结果页
		let  pageNameM2 = "jgm"; //默认移动端荐股结果页
		let report_txt = encodeURI(encodeURI(pageInfo.reportTxt));
		if(reg.test(url)){
			isM = true;
		}else{
			isM = false;
			//判断是z的页面进行跳转
			if (/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) {
				isM = true;
			}
		}
		
		//判断不需要调查问卷
		if(pageInfo.examine == 1){
			isMore = '&isMore=0';
		}
		
		//指定结果页路径显示
		pageNameP1 = pageInfo.pageNameP1 ? pageInfo.pageNameP1 : pageNameP1;
		pageNameP2 = pageInfo.pageNameP2 ? pageInfo.pageNameP2 : pageNameP2;
		pageNameM1 = pageInfo.pageNameM1 ? pageInfo.pageNameM1 : pageNameM1;
		if(pageInfo.pageName || pageInfo.pageNameM2){
			pageNameM2 = pageInfo.pageName ? pageInfo.pageName : pageInfo.pageNameM2;
		}
		
		if(pageInfo.givenInfo){
			givenInfo='&givenInfo=1';
		}
		if(pageInfo.reportTxt){
			reportTxt='&reportTxt='+ report_txt;
		}
		if(pageInfo.reportNum){
			reportNum='&reportNum='+ pageInfo.reportNum;
		}
		if(this.getUrlKey('f')){
			f='&f='+this.getUrlKey('f');
		}
		if(pageInfo.pingfen){
			pingfen='&pingfen='+pageInfo.pingfen;
		}
		if(pageInfo.pageType == "zg"){
			if(isM){
				window.location.href='/res/'+pageNameM1+'/?stockno='+pageInfo.codeNum+'&phoneNum='+phoneNum+reportTxt+reportNum+pingfen+f+givenInfo+isMore+isServe;
			}else{
				window.location.href='/res/'+pageNameP1+'/?stockno='+pageInfo.codeNum+'&phoneNum='+phoneNum+reportTxt+reportNum+pingfen+f+givenInfo+isMore;
			}
		}else{
			if(isM){
				// 判断是不是抽奖页面
				if(pageInfo.prizeName === "" || pageInfo.prizeName === undefined){
					window.location.href='/res/'+pageNameM2+'/?phoneNum='+phoneNum+reportTxt+reportNum+pingfen+f+givenInfo+isMore+isServe;
				}else{
					window.location.href='/res/'+pageNameM2+'/?phoneNum='+phoneNum+reportTxt+reportNum+pingfen+f+'&prizeName='+pageInfo.prizeName+givenInfo+isMore+isServe;
				}
			}else{
				window.location.href='/res/'+pageNameP2+'/?phoneNum='+phoneNum+reportTxt+reportNum+pingfen+f+givenInfo+isMore;
			}
		}
	}
	
}
