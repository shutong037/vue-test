<template>
	<div class="mobile">
		<div v-if="thisInfo" style="font-size: 16px;padding: 10px 0;">我是移动端</div>
		<router-view v-else></router-view>
	</div>
</template>

<script>
export default{
	name:'m',
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
			this.thisInfo = to.name == 'm' ? true : false;
		}
	}
}
</script>

<style>
</style>
