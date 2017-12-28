<template>
    <section class="sj-scroll-bar-warp" :style="{width:`${width}px`}" v-if="scale !== 1">
        <div
                class="sj-scroll-bar-box"
                :style="{width: `${width -4}px`,height : `${sHeight}px`, 'marginTop': `${mdfT}px`}"
                @mousedown="start($event)"
        >
            <!--@mousemove="move($event)"-->
            <!--@mouseout="end($event)"-->
            <!--@mouseup="end($event)"-->
        </div>
    </section>
</template>
<script>
    /* @param height 滚轴高度*/
    /*@param 滚轴父盒子高度*/
   /*@param top 滚轴离顶端高度*/
   /*@param mHieght 最大高度*/
    import {on, off} from '../../../utils/dom'
    export default  {
	    $x: null,
        $isDown: false,
    	props: {
    		mHeight: {
			    type: Number,
			    require: true,
            },
    		sHeight:{
    			type: Number,
                require: true,
                default: 60
            },
            width: {
    			type: Number,
                require: true,
	            default: 10
            },
            top: {
    			type: Number,
                require: true,
                default: 0
            },
            scale: {
	            type: Number,
	            require: true,
	            default: 1
            }
        },
        data () {
    		return {
    			mdfT: this.top,
                el:  null
            }
        },
        watch: {
    		top () {
    			this.mdfT = this.top
            }
        },
        methods: {
            start (e) {
            	const {pageY} = e
                const {move, end, el} = this
                Object.assign(this.$options, {
                	$x: pageY,
                    $isDown: true
                })
                on({
                    el,
                    type: 'mousemove',
                    fn: move
                })
	            on({
		            el,
		            type: 'mouseup',
		            fn: end
	            })
            },
            move (e) {
            	e.preventDefault()
	            const {pageY} = e
                const {$options: {$x, $isDown},  mHeight, sHeight, mdfT} = this
                // mHeight sHeight top
                if ($isDown) {
	            	let v = mdfT + pageY - $x
	            	if (v <= 0) v = 0
                    if (v + sHeight >= mHeight) v = mHeight - sHeight
	                this.mdfT = v
                    this.$options.$x = pageY
                }
                this.$emit('mod:scroll', this.mdfT)
            },
            end (e) {
	            const {move, end, el} = this
            	off({
                    el,
                    type: 'mousemove',
                    fn: move
                })
	            off({
		            el,
		            type: 'mouseup',
		            fn: end
	            })
	            Object.assign(this.$options, {
		            $x: null,
		            $isDown: false
	            })
            }
        },
        mounted () {
            this.el = window.document.body
        },
	    beforeDestroy () {
		    const {move, end, el} = this
		    off({
			    el,
			    type: 'mousemove',
			    fn: move
		    })
		    off({
			    el,
			    type: 'mouseup',
			    fn: end
		    })
        }
    }
</script>
<style>
    .sj-scroll-bar-warp {
        box-sizing: border-box;
        position: absolute;
        top: 0;
        right: 0;
        height: 100%;
        background: white;
        .sj-scroll-bar-box {
            margin: 0 auto;
            background: black;
            cursor: pointer;
            border-radius: 2px;
        }
    }
</style>