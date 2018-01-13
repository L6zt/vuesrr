import Vue from 'vue'
import App from './App.vue'
import rgComponent from './packages/registerComponents'
import  {loadPlugins} from './plugins/index'
import  clickOut from './directives/clickOut'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
// 插件
loadPlugins(Vue)
// 自己组件
Vue.use(rgComponent)
// 第三方 ui库
Vue.use(ElementUI)
//
Vue.directive('clickOut', clickOut)
export function createApp () {
  const store = createStore()
  const router = createRouter()
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })
  return { app, router, store }
}
