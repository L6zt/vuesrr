<template>
    <div class="canvas-load-container">
        <canvas width="100" height="100" ref="canvas">
        </canvas>
    </div>
</template>
<script>
    import {requestAnimationFrame, cancelAnimationFrame} from '../../utils/tools.js'
    export default  {
    	ctx: null,
        k: null,
        data () {
    	 return	 {
    	 	deg: 0
         }
        },
    	mounted () {
    		const vdeg = 0.03
    		this.$options.ctx = this.$refs['canvas'].getContext('2d')
            const am = () => {
	            this.draw(this.deg)
	            this.deg = this.deg + vdeg
                requestAnimationFrame(am)
            }
		   this.$options.k =  requestAnimationFrame(am)
        },
        destroyed () {
    		cancelAnimationFrame(this.$options.k)
            this.$options.k = null
        },
        methods: {
	        draw (deg) {
		        // 初始化
		        const {$options: {ctx}} = this
		        const endAngle = Math.PI * 1.5
                const times = parseInt(deg / endAngle)
                const k = parseInt(times / 2) + 1
                const startAngle = deg % endAngle
                ctx.clearRect(0, 0, 100, 100)
		        ctx.save()
		        ctx.translate(50, 50)
                ctx.rotate(deg)
                ctx.beginPath()
		        ctx.lineWidth = 5
		        ctx.strokeStyle =`rgb(${Math.floor(255 - 42.5 * (times % 6))},${Math.floor(255-42.5 * 1)},0)`
                if (times % 2 === 0) {
	                ctx.arc(0, 0, 25, startAngle + (k - 1) * endAngle, k * endAngle, false) // wu
                } else {
	                ctx.arc(0, 0, 25, k * endAngle ,  k * endAngle + startAngle, false) // you
                }
		        ctx.stroke()
                ctx.closePath()
                ctx.restore()
	        }
        }
    }
</script>
<style>

</style>