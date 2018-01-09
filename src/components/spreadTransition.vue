<script>
    import  {addClass, removeClass, on, off} from '../utils/dom'
    export default {
	    functional: true,
    	render (h, ct) {
	    	let height, fn
            return h('transition', {
            	props: {
                    css: false
                },
            	on: {
		            beforeEnter (el) {
		            	addClass(el, 'transition-am')
                        el.style.height =  0
                        el.style.overflow = 'hidden'
                    },
                    enter (el, done) {
				            height = el.scrollHeight
				            el.style.height =  `${height}px`
				            el.style.overflow = 'hidden'
	                        fn = () => {
		                        done()
	                        }
				            on({
                                el,
                                type: 'transitioned',
                                fn
                            })
                    },
                    afterEnter (el) {
		            	removeClass(el, 'transition-am')
		            	off(
				            {
					            el,
					            type: 'transitioned',
					            fn
				            }
                        )
                    },
		            beforeLeave (el) {
			            addClass(el, 'transition-am')
			            height = el.scrollHeight
			            el.style.height =  `${height}px`
			            el.style.overflow = 'hidden'
                    },
		            leave (el, done) {
			            el.style.height =  0
			            el.style.overflow = 'hidden'
			            fn = () => {
				            done()
			            }
			            on({
				            el,
				            type: 'transitioned',
				            fn
			            })
                    },
		            afterLeave (el) {
			            removeClass(el, 'transition-am')
			            off(
				            {
					            el,
					            type: 'transitioned',
					            fn
				            }
			            )
                    }
                }
            }, ct.children)
        }
    }
</script>
<style>
    .transition-am {
        transition: height 300ms;
    }
</style>