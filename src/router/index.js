import Vue from 'vue'
import VueRouter from 'vue-router'

import M from '@/views/m/M.vue'
import P from '@/views/p/P.vue'

import store from "../store/index.js";

Vue.use(VueRouter)

// 页面刷新时，重新赋值token
if (sessionStorage.getItem('token')) {
	store.commit('set_token', sessionStorage.getItem('token'))
}

const routes = [
	/* 单页面的使用  */
/* 	{
		path:'/m/jgdm2/',
		name: 'jgdm2',
		component: () => import("@/views/m/Jgdm2.vue"),
		meta:{
			title:'荐股专家2',
			content:{
				keywords:'这里是第二个keywords',
				description:'这里是第二个description',
			}
		}
	} */
	
	{
		path: '*',
		redirect: '/404'
	},
	{
		path: '/404',
		name: '404',
		component:  () => import("@/views/404.vue"),
	},
	{
		path: '/',
		name: 'index',
		component:  () => import("@/views/Index.vue"),
		meta:{
			title: '首页',
			content:{
				keywords:'这里是第一个keywords',
				description:'这里是第一个description',
			}
		}
	},
	{
		path: '/m',
		name: 'm',
		component: M,
		meta:{
			title:'荐股专家',
			content:{
				keywords:'这里是第2个keywords',
				description:'这里是第2个description',
			}
		},
		children:[
			{
				path:'jgdm2',
				name: 'jgdm2',
				component: () => import("@/views/m/Jgdm2.vue"),
				meta:{
					title:'荐股专家2',
					content:{
						keywords:'这里是第二个keywords',
						description:'这里是第二个description',
					}
				}
			}
		]
	},
	{
		path: '/p',
		name: 'p',
		component: P,
		children:[]
	}
]


let mode = window.location.hostname == "localhost" ? "hash" : "history"
const router = new VueRouter({
	mode: mode, //history(线上)   hash(本地)
	routes
})

router.beforeEach((to,from,next) => {
   /*路由发生变化修改页面meta */
  if(to.meta.content){
    let head = document.getElementsByTagName('head');
    let meta = document.createElement('meta');
    document.querySelector('meta[name="keywords"]').setAttribute('content', to.meta.content.keywords)
    document.querySelector('meta[name="description"]').setAttribute('content', to.meta.content.description)
    meta.content = to.meta.content;
    head[0].appendChild(meta)
  }
   /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  
  //这里的requireAuth为路由中定义的 meta:{requireAuth:true}，意思为：该路由添加该字段，表示进入该路由需要登陆的
  if (to.matched.some(r => r.meta.requireAuth)) {
	if(store.state.token){
		next()
	}else{
		next({
			path: '/login',
			query: {redirect: to.fullPath}
		})
	}
  }else{
	next()
  }
})


export default router
