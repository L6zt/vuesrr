	import $ from './lib/jquery'
	export const get = ({url, data = {}}) => {
		return new Promise((r, j) => {
			$.ajax({
				url,
				method: 'GET',
				data,
				success (data) {
					r(data)
				},
				error (err) {
					j(err)
				}
			})
		}).then(({flag, data, errMsg}) => {
			if (flag === 999) {
				return Promise.reject({
					data,
					errMsg
				})
			}
			return {
				data,
				flag,
				errMsg
			}
		})
	}
	export const post = ({url, data = {}}) => {
		return new Promise((r, j) => {
			$.ajax({
				url,
				method: 'POST',
				data,
				success (data) {
					r(data)
				},
				error (err) {
					j(err)
				}
			})
		}).then(( {flag, data, errMsg}) => {
			if (flag === 999) {
				return Promise.reject({
					data,
					errMsg
				})
			}
			return {
				data,
				flag,
				errMsg
			}
		})
	}
	