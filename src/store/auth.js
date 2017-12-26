import {post} from 'ajax'
import {LOGIN_IN} from '../assert/js/api.js'
const auth = {
	namespaced: true,
	state: {
		// 登陆标志 // 用户信息
		isLogin: false
	},
	mutations: {
		postUserMsg (state, b) {
			state.isLogin = b
		}
	},
	actions: {
		login ({state, rootState, dispatch, commit}, playload) {
			return post({
				url: LOGIN_IN,
				data: playload
			}).then(({data, errMsg}) => {
				if (errMsg) {
					return Promise.reject(errMsg)
				} else {
					commit('postUserMsg', true)
					return data
				}
			})
		}
	}
}
export default auth