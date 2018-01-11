<template>
    <div class="canvas-load-container">
        <canvas width="100" height="100" ref="canvas">
        </canvas>
    </div>
</template>
<script>
    export default  {
    	ctx: null,
        data () {
    	 return	 {
    	 	deg: 0
         }
        },
    	mounted () {
    		const vdeg = 0.01
    		this.$options.ctx = this.$refs['canvas'].getContext('2d')
            setInterval(() => {
	            this.draw(this.deg)
	            this.deg = this.deg + vdeg
            }, 13)
        },
        methods: {
//    		draw () {
//    			// 初始化
//                const {$options: {ctx}} = this
//    			ctx.restore()
//                ctx.translate(50, 50)
//                ctx.beginPath()
//                ctx.fillStyle = '#ccc'
//                ctx.moveTo(20, 0)
//                ctx.arc(0, 0, 20, 0 ,Math.PI, true)
//                ctx.lineTo(-25, 0)
//                ctx.moveTo(25, 0)
//                ctx.arc(0, 0, 25, 0, Math.PI, true)
//			    ctx.moveTo(25, 0)
//                ctx.lineTo(20, 0)
//                ctx.closePath()
//                ctx.stroke()
//            },
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
		        ctx.strokeStyle = 'black'
                 // 0 1.5 1.5 1.5 3 3
                // 1
//		        ctx.arc(0, 0, 25, startAngle , endAngle, false) // wu
//		        ctx.arc(0, 0, 25, endAngle ,  endAngle + startAngle ) // you
//		        // 2
//		        ctx.arc(0,0, 25, endAngle + startAngle , 2 * endAngle)// wu
//		        ctx.arc(0,0, 25, 2 * endAngle , 2 * endAngle  + startAngle )// you
//		        // 3
//		        ctx.arc(0,0, 25, 2 * endAngle + startAngle , 3 * endAngle)// wu
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