import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
Vue.use(Router)
Vue.use(Meta)
export function createRouter () {
  return new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes: [
	  {path: '/',
		  // 主组件
		component: () => import('../views/frameWork.vue'),
		  // 儿子组件
		children: [
			// 默认组件
			// 首页组件
			{  path: '',
			   component: () => import('../views/index.vue'),
			},
			// {  path: '',
			// 	component: () => import('../views/common/index.vue'),
			// 	children: [
			// 		{path: 'test', component: () => import('../views/test/index.vue')},
			// 		{path: 'tp', component: () => import('../views/test/tp.vue')}
			// 	]
			// },
		]
	  },
	  {path: '/gift', component: () => import('../views/gift/gift.vue')},
	  {path: '/auth/login', component: () => import('../views/auth/login.vue')},
	  {path: '*', component: () => import('../views/notFound.vue')},
    ]
  })
}
