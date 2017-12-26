<template>
    <div class="sj-scroll-container"
         :style="{'height': `${height}px`, paddingRight: `${scale === 1 ? 0: width}px`}"
         ref="con"
         @wheel="move($event)"
    >
        <div class="sj-scroll-slot-con" :style="{transform: `translate(0,${top}px)`}">
            <slot></slot>
        </div>
        <scroll
           :sHeight="sHeight"
           :width="width"
           :top="sTop"
           :mHeight="height"
           :scale="scale"
           @mod:scroll="sTf"
        >
        </scroll>
    </div>
</template>
<script>
    import scroll from './comp/scroll.vue'
    export default  {
    	props: {
    		height: {
    			type: Number,
                required: true
            }
        },
        data () {
    		const {height} = this
    		return {
                width: 10,
                top: 0,
                sTop: 0,
                slHeight: height
            }
        },
        computed: {
    		scale () {
			    const {height, slHeight} = this
			    const scale = height/ slHeight
                return scale
            },
	        sHeight () {
		        const {height, scale} = this
    			return height * scale
            }
        },
        methods: {
    		getScrollheight () {
    			const {$refs: {con}} = this
                this.slHeight = con && con.scrollHeight
            },
            move (e) {
    			console.log(e)
                const {deltaY} = e
                const {top, slHeight, height} = this
                const max = height - slHeight
                let v = top + deltaY * 0.05
                if (v >=0) v = 0
                if (v <= max) v = max
                this.top = v
                this.transNum('f')
            },
            transNum (type, num) {
    			// height/ slHeight * height
    			const {height, slHeight, scale, top} = this
                const vscale = 1 - scale
	            const max = height - slHeight
    			if (type === "f") {
				    this.sTop = - top * scale
			    }
                else {
                    this.top = - num / scale
                }
            },
            sTf (num) {
    			this.transNum('s', num)
            }
        },
    	components: {scroll},
        mounted () {
	        this.getScrollheight()
            this.transNum('f')
        },
	    updated () {
    		// 获取滚动高度
            this.getScrollheight()
		    this.transNum('f')
        }
    }
</script>
<style>
  .sj-scroll-container {
      box-sizing: border-box;
      position: relative;
      overflow: hidden;
      background: black;
      .sj-scroll-slot-con {
      }
  }
</style>