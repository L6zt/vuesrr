	import {on, off, contains} from '../utils/dom'
	export default {
		bind(el, binding, vnode) {
			const {context} = vnode
			const {expression} = binding
			const mC = window.document.body
			el._clickOut || (el._clickOut = {})
			const otFn = (e) => {
				if (!contains(el, e.target)) {
					context[expression](e)
				}
			}
			context.$on('hook:mounted', () => {
				el._clickOut = {
					'click': otFn
				}
				on({el: mC, type: 'click', fn: otFn})
			})
		},
		unbind(el, bing, vnode) {
			const {_clickOut} = el
			const mC = window.document.body
			_clickOut && _clickOut.click && (off({el: mC, type: 'click', fn: _clickOut.click}))
		}
	}