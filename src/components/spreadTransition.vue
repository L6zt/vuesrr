<script>
    import  {addClass, removeClass, on, off} from '../utils/dom'
    export default {
	    functional: true,
    	render (h, ct) {
	    	let height
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
	                    const fn = () => {
		                    done()
		                    removeClass(el, 'transition-am')
		                    off(
			                    {
				                    el,
				                    type: 'transitionend',
				                    fn
			                    }
		                    )
		                    el.style.height = ''
		                    el.style.overflow =''
	                    }
	                    on({
		                    el,
		                    type: 'transitionend',
		                    fn
	                    })
                        setTimeout(() => {
	                        height = el.scrollHeight
	                        el.style.height =  `${height}px`
	                        el.style.overflow = 'hidden'
                        })
                    },
		            beforeLeave (el) {
			            const height = el.scrollHeight
			            addClass(el, 'transition-am')
			            el.style.height =  `${height}px`
			            el.style.overflow = 'hidden'
                    },
		            leave (el, done) {
			           const fn = () => {
				            done()
				            removeClass(el, 'transition-am')
				            off(
					            {
						            el,
						            type: 'transitionend',
						            fn
					            }
				            )
				            el.style.height = ''
				            el.style.overflow = ''
			            }
			            on({
				            el,
				            type: 'transitionend',
				            fn
			            })
                        setTimeout(() => {
	                        el.style.height = 0
                        })
                    }
                }
            }, ct.children)
        }
    }
</script>
<style>
    .transition-am {
        transition: all 300ms;
    }
</style>