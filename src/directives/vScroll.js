	export default {
		bind(el, binding, vnode) {
			//console.log(vnode.context)
			const {context: vm} = vnode
			const {value} = binding
			console.log(value)
		}
	}