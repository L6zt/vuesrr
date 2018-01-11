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
                ctx.clearRect(0, 0, 100, 100)
		        ctx.save()
		        ctx.translate(50, 50)
                ctx.rotate(deg)
		        ctx.beginPath()
		        ctx.fillStyle = '#333'
		        ctx.arc(0, 0, 25, 0 ,Math.PI, true)
		        ctx.fill()
		        ctx.beginPath()
		        ctx.fillStyle = '#fff'
		        ctx.arc(0, 0, 20, 0, Math.PI, true)
                ctx.fill()
                ctx.restore()
	        }
        }
    }
</script>
<style>

</style>