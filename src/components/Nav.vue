<template>
	<div class="nav">
		<ul>
			<li><router-link to="/">首页</router-link></li>
			<li><router-link to="/fenlei">分类</router-link></li>
			<li><router-link to="/xiangqing">详情</router-link></li>
			<li><router-link to="/wode">我的</router-link></li>
		</ul>
	</div>
</template>

<script>
export default {
  name: 'Nav'
}
</script>

<style scoped>
.nav ul{
	list-style: none;
}
.nav ul li{
	float: left;
	padding: 5px 10px;
	color: #666;
	cursor: pointer;
}
.nav ul li:hover{
	color: #333;
}
</style>
