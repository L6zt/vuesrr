
    const isServer = () => {
		return typeof window !== "object"
    }
	const animation = () => {
	    if (isServer()) {
	    	return {}
	    }
		const  vendors = ['webkit', 'moz']
		let requestAnimationFrame = window.requestAnimationFrame
		let cancelAnimationFrame = window.cancelAnimationFrame
		for(let i  = 0; i < vendors.length && !requestAnimationFrame; ++i) {
			requestAnimationFrame = window[vendors[i] + 'RequestAnimationFrame']
			cancelAnimationFrame = window[vendors[i] + 'CancelAnimationFrame'] || window[vendors[i] + 'CancelRequestAnimationFrame']
		}
		if (!requestAnimationFrame) {
			requestAnimationFrame = (cb, element) => {
				const id = setTimeout(function() {
					cb()
				}, 13)
				return id
			}
		}
		if (!cancelAnimationFrame) {
			cancelAnimationFrame = (id) => {
				clearTimeout(id)
			}
		}
		return {requestAnimationFrame, cancelAnimationFrame}
	}
	const amObj = animation()
	export const requestAnimationFrame = amObj.requestAnimationFrame
    export const cancelAnimationFrame = amObj.cancelAnimationFrame
