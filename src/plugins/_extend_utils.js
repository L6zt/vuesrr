// 共同方法
import cookie from 'js-cookie'
const  _extend_utils = {}
_extend_utils.install = (Vue, options) => {
	Vue.prototype.$cookie = cookie
}
export default _extend_utils