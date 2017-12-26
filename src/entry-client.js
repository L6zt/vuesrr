import Vue from 'vue'
import 'es6-promise/auto'
import { createApp } from './app'
import ProgressBar from './components/ProgressBar.vue'

// global progress bar
const bar = Vue.prototype.$bar = new Vue(ProgressBar).$mount()
document.body.appendChild(bar.$el)
Vue.mixin({
	beforeRouteUpdate (to, from, next) {
		const { asyncData } = this.$options
		if (asyncData) {
			asyncData.call( null,{
				store: this.$store,
				route: to
			}).then(next).catch(next)
		} else {
			next()
		}
	}
})
const { app, router, store } = createApp()
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}
router.onReady(() => {
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to)
    const prevMatched = router.getMatchedComponents(from)
    let diffed = false
    const activated = matched.filter((c, i) => {
      return diffed || (diffed = (prevMatched[i] !== c))
    })
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => _)
    if (!asyncDataHooks.length) {
      return next()
    }

    bar.start()
    Promise.all(asyncDataHooks.map(hook => hook({ store, route: to })))
      .then(() => {
        bar.finish()
        next()
      })
      .catch(next)
  })
	const firstMatchs = router.getMatchedComponents()
	const asyncDataHooks = firstMatchs.map(c => c.asyncData).filter(_ => _)
    Promise.all(asyncDataHooks.map(hook => hook({store, route: router.currentRoute})))
        .then(() => {
	        app.$mount('#app')
        }).catch(() => {
    })
})

