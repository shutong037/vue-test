<template>
  <div class="jgdm">
    <p class="tip">投资有风险，入市需谨慎</p>
	<div class="words">
		<h2><span class="words_time"><span class="week">{{weekNow}}</span>（<span class="btnBg_time" v-html="btnBg_time"></span>）</span>早盘关注票</h2>
		<p class="words_txt"><em class="clock"></em><span class="data" id="new_data" v-html="new_data"></span><em class="flag"></em>明日必涨</p>
	</div>
    <div class="detailed">
		<h3>本站仅提供明日好股，需要现在买进的股票请勿扰</h3>
		<p class="detailed_txt"><span class="weekNow"></span>早盘预计拉升<span class="occupy">5%</span>以上，方便验证实力，附图一份</p>
		<p class="detailed_tip">注意:截图并非股票最近截图，截图都是随机截取某年某月某天的截图</p>
		<img src="../../assets/imgs/trend.jpg"  class="trend" alt="">
		<p class="detailed_txt2">出票之后会发布股票走势截图一张 次日早盘公布股票代码与截图时间提供验证</p>
	</div>
	<h2 class="good_trend">明日关注好股已发布</h2>
	<input class="dialog_input" v-model="phoneNum" placeholder="输入手机号，5秒得股票" maxlength="11" type="tel">
	<mt-button class="dialog_btn pulse animated infinite" id="tg_btn4145" @click.native ="addUserInfo">立即免费领取</mt-button>
	<p class="tip2">注：信息将通过短信方式发送至您，请注意查收</p>
  </div>	
</template>
<script>
export default {
	name: 'jgdm2',
	data(){
		return{
			other: '明日关注好股',
			report_txt: '明日好股',
			new_data: '',
			weekNow: '',
			btnBg_time:'',
			phoneNum:''
		}
	},
	mounted(){ //页面初始方法
		this.tick();
		this.addDate();
	},
	methods:{ //监听方法  click事件等
		addUserInfo: function(){
			this.doAjax_jiangu();
		},
		//时间变换
		showLocale: function(objD){
			let str;
			let yy = objD.getYear();
			if (yy < 1900) yy = yy + 1900;
			let MM = objD.getMonth() + 1;
			if (MM < 10) MM = '0' + MM;
			let dd = objD.getDate();
			if (dd < 10) dd = '0' + dd;
			let hh = objD.getHours();
			if (hh < 10) hh = '0' + hh;
			let mm = objD.getMinutes();
			if (mm < 10) mm = '0' + mm;
			let ss = objD.getSeconds();
			if (ss < 10) ss = '0' + ss;
			str =  yy + "-" + MM + "-" + dd +" &nbsp;&nbsp;"+ hh + ":" + mm + ":" + ss;
			return (str);		},
		tick: function(){
			let today = new Date();
			let that = this;
			this.new_data = this.showLocale(today);
			window.setTimeout(function(){
				that.tick();
			}, 1000);		},
		//获取当前月份和日期
		addDate: function(){
			let time = new Date();
			let days = "";
			let dateNum = time.getDay();
			let weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
			if(time.getDay() == 6){
				days = this.Common.GetDateStr(2);
			}else if(time.getDay() == 0){
				days = this.common.GetDateStr(1);
			}else if(time.getDay() == 5){
				days = this.Common.GetDateStr(3);
			}else{
				days = this.Common.GetDateStr(1);
			}
			this.weekNow = weekDay[dateNum];
			this.btnBg_time = days[0] + "月" + days[1] +"日";
		},
		//荐股申请
		doAjax_jiangu: function(){
			this.Zfpsn.zfSendStep("step1A");
			if (this.Common.expreg.test(this.phoneNum)) {
				let saveUrl = this.Common.whichSaveApi().url;
				this.$post(saveUrl,{
					kind:1,
					phoneNum: this.phoneNum,
					otherInfo: this.other
				}).then(res => {
					let data = res.data;
					if(data.statusCode == 1){
						let pageInfo = {
							phoneNum: this.phoneNum,
							pageType: "jg",
							reportTxt: this.report_txt
						};
						this.Common.goLinkPage(pageInfo);
					}else if (res.statusCode == -1) {
						window.location.href='/res/jgmd/';
					} else {
						this.$toast(data.message);
					}
				}).catch(function(error){
					console.log(error)
				})
			} else {
				this.$toast('请您填写正确的电话号码！');
			}		}
	}
}
</script>
<style>
.jgdm{
	padding-bottom: 0.8rem;
}
.tip{
	font-size: 0.24rem;
	color: #999999;
	position: absolute;
	top: 0.1rem;
	right: 0.2rem;
}
.hidden {
	display:none
}
.layui-layer-hui .layui-layer-content {
	padding:0.24rem 0.32rem!important
}
.layui-layer-dialog .layui-layer-content {
	font-size:0.36rem!important;
	line-height:0.8rem!important;
}
.content {
	position:absolute;
	top:0;
	z-index:2;
	width:100%;
}
.words {
	width:7.5rem;
	height:1.06rem;
	padding-top:0.42rem;
	border-bottom:1px solid #cdcdcd;
	text-align:center;
}
.words h2 {
	font-size:0.46rem;
	color:#000000;
}
.words_txt {
	color:#999999;
	font-size:0.22rem;
	height: 0.4rem;
	line-height: 0.4rem;
}
.clock {
	display:inline-block;
	width:0.18rem;
	height:0.18rem;
	margin-right:0.07rem;
	background:url(../../assets/imgs/clock.png) no-repeat;
	background-size:100% 100%;
}
.flag {
	display:inline-block;
	width:0.15rem;
	height:0.2rem;
	margin-left:0.42rem;
	margin-right:0.07rem;
	background:url("../../assets/imgs/flag.png") no-repeat;
	background-size:100% 100%;
}
.detailed {
	width:7.4rem;
	text-align:center;
	margin:0 auto;
}
.detailed h3 {
	font-size:0.32rem;
	color:#ff000d;
	padding:0.2rem 0;
}
.detailed_txt {
	color:#333333;
	font-size:0.3rem;
}
.detailed_txt .occupy {
	color:#ff000d;
}
.detailed_tip {
	width:7.4rem;
	line-height:0.3rem;
	margin:0.3rem auto 0;
	background-color:#ffff00;
	color:#030000;
	font-size:0.21rem;
}
.trend {
	display:block;
	width:7.18rem;
	height:3.89rem;
	margin:0.1rem auto;
}
.detailed_txt2 {
	color:#030000;
	font-size:0.18rem;
}
.good_trend {
	color:#000001;
	font-size:0.44rem;
	text-align:center;
	padding:0.25rem 0 0.22rem;
}
.dialog_input {
	display:block;
	outline:none;
	width:6.09rem;
	height:1.08rem;
	font-size:0.33rem;
	border:1px solid #666666;
	border-radius:0.1rem;
	text-align:center;
	margin:0 auto;
}
.dialog_btn {
	width:6.09rem;
	height:1.18rem;
	background:url('../../assets/imgs/btn2.png');
	letter-spacing:2px;
	background-size:100% 100%;
	text-align:center;
	line-height:1.18rem;
	font-size:0.36rem;
	color:#fcf303;
	font-weight:bold;
	margin:0.25rem auto;
}
.tip2{
	font-size: 0.23rem;
	color: #666;
	margin-top: 0.25rem;
	text-align: center;
}
.company_info{
	color: #666;
	line-height: 0.332rem;
	font-size: 0.17rem;
	text-align: center;
	margin-top: 0.6rem;
}
</style>