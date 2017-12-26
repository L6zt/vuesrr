import request from 'request'
export const get = ({url, data = {}}) => {
	url += '?'
	for(let key in data) {
		url += `${key}=${encodeURIComponent(data[key])}&`
	}
	url = url.replace(/&$/, '')
	return new Promise((r, j) => {
		request.get({url}, (err, response, body) => {
			if (err) {
				return j(err)
			}
			console.log(typeof body)
			return r(JSON.parse(body))
		})
	}).then(({flag = 1, data = null, errMsg = null}) => {
		console.log(data)
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
		request.post({url, form: data}, (err, response, body) => {
			if (err) {
				return j(err)
			}
			console.log(typeof body)
			return r(JSON.parse(body))
		})
	}).then(({flag = 1, data = null, errMsg = null}) => {
		console.log(data)
		if (flag === 999) {
			return Promise.reject({
				data,
				errMsg
			})
		}
		return {
			data,
			errMsg
		}
	})
}