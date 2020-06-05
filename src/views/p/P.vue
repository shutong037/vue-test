<template>
	<div class="terminal">
		<div v-if="thisInfo" style="font-size: 16px;padding: 10px 0;">
			我是PC端
		</div>
		<router-view v-else></router-view>
	</div>
</template>

<script>
export default{
	name:'p',
	watch:{
		'$route': 'routerChage'
	},
	data(){
		return {
			thisInfo: true
		}
	},
	mounted() {
		this.routerChage(this.$route);
	},
	methods:{
		routerChage: function (to){
			this.thisInfo = to.name == 'p' ? true : false;
		}
	}
}
</script>

<style>
</style>
