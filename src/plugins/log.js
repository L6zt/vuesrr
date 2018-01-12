// 父子事件 交互
import Log from '../packages/log/log.vue'
const log  = {}
log.install = (Vue, options) => {
	Vue.prototype.$log = ({type, content}) => {
		// 生成 寄存 dom 元素
		const elem =  document.createElement('div')
		const body = document.body
		elem.setAttribute('data-id', Math.random().toString().slice(2))
		const vm = new Vue({
			data () {
				return {
					type,
					content,
					show: false
				}
			},
			components: {Log},
			render (h) {
			return	h('log', {
					props: {
						type: this.type,
						content: this.content,
						show: this.show
					}
				})
			}
		})
		body.appendChild(elem)
		vm.$mount(elem)
		setTimeout(() => {
			vm.show = true
			setTimeout(() => {
				vm.show = false
				body.removeChild(vm.$el)
				vm.$destroy()
			}, 3000)
		})
	}
}
export default log