<template>
  <div class="about">
    <h1>This is an about page</h1>
	<p>虽然一路磕磕绊绊，还是要站起来继续前进！</p>
	<div class="div1">
		2020会不会是世界末日！
	</div>
	<div class="div2" @click="showMsg">不是。</div>
  </div>
</template>
<script>
export default {
  name: 'about',
  data (){
	return{
		meg: '真是不方便'
	}
  },
  methods: {
	showMsg:function(){
		alert("123");
		window.console.log("456");
	}
  }
  
}
</script>
<style scoped>
.div1,.div2{
	display: inline-block;
	padding: 30px;
	line-height: 2;
	margin: auto 10px;
	font-size: 18px;
	cursor: pointer;
	color: #333333;
	border: 1px solid red;
	border-radius: 5px;
}
.div1:hover,.div2:hover{
	background-color: red;
	color: #ffffff;
}

</style>