	import Vue from 'vue'
	import Test  from  './test/Test.vue'
	import Form from './form/Form.vue'
	import FormItem from './form/FormItem.vue'
	const components = [Test, Form, FormItem]
	const rgComponent = {}
	rgComponent.install = (Vue, options) => {
		components.forEach(item => {
			const {name} = item
			Vue.component(name, item)
		})
	}
	export default rgComponent