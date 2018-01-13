	import _event from './_event'
	import log from './log'
	import _extend_utils from './_extend_utils'
	export const loadPlugins = (Vue) => {
		Vue.use(_extend_utils)
		Vue.use(log)
		Vue.use(_event)
	}