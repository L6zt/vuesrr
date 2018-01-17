// 父子事件 交互
import Log from '../packages/log/log.vue'
const log  = {}
log.install = (Vue, options) => {
	Vue.prototype.$log = ({type, content}) => {
		// 生成 寄存 dom 元素
		const elem =  document.createElement('div')
		const body = document.body
		elem.setAttribute('data-uuid', Math.random().toString().slice(2))
		const vm = new Vue({
			data () {
				return {
					type,
					content,
					show: false
				}
			},
			components: {Log},
			destroyed () {
				body.appendChild(elem)
				this.$mount(elem)
				setTimeout(() => {
					this.show = true
					setTimeout(() => {
						this.show = false
						body.removeChild(vm.$el)
						this.$destroy()
					}, 3000)
				})
			},
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
	}
}
export default log