// 父子事件 交互
const eventMixin = {}
  eventMixin.install = (Vue, options) => {
	Vue.mixin({
		methods: {
			sendFather (cpName , {event, playLoad}) {
				// 子向父节点
				let parent = this.$parent
				const root = this.$root
				while (parent.$options.name !== cpName && parent !== root) {
					parent = parent.$parent
				}
				parent.$emit(event, playLoad)
			}
		}
	})
  }
  export default eventMixin