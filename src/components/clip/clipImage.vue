<template>
    <div class="jc-clip-image" :style="clip">
        <canvas ref="ctx"
                :width="clip.width"
                :height="clip.width"
                @mousedown="handleClip($event)"
        >
        </canvas>
        <input type="file" ref="file" @change="readFileMsg($event)">
        <div class="upload-warp">
            <a class="upload-btn" @click="dispatchUpload($event)">upload</a>
            <a class="upload-cancel">cancel</a>
        </div>
    </div>
</template>
<script>
    import {on, off, once} from '../../utils/dom'
   export default {
       ctx: null,
       file: null,
       x: 0,
       y: 0,
       xV: 0,
       yV: 0,
       nX: 0,
       nY: 0,
       img: null,
       props: {
       	    src: {
       	    	type: String,
                default: null
            },
           clip: {
       	    	type: Object,
                default () {
	              return  {width: '200px', height: '200px'}
                }
           }
       },
       data () {
       	return {
       		isShow: false,
            base64: null
        }
       },
       computed: {
       	width () {
       	  const {clip} = this
	      return  parseFloat(clip.width.replace('px', ''))
        },
        height () {
	     const {clip} = this
	      return  parseFloat(clip.height.replace('px', ''))
        }
       },
       mounted () {
       	   const {$options, $refs, width, height} = this
	       Object.assign($options, {
		       ctx: $refs.ctx.getContext('2d'),
		       file: $refs.file,
               nX: -width / 2,
               nY: -height / 2
	       })
       },
       methods: {
            dispatchUpload (e) {
	            this.clearState()
            	const {file} = this.$options
            	e.preventDefault()
                file.click()
            },
           readFileMsg () {
	           const {file} = this.$options
               const {draw, createImage, $options: {nX, nY}} = this
               const wFile = file.files[0]
               const reader = new FileReader()
               reader.onload = (e) => {
                   const img = createImage(e.target.result, (img) => {
	                   draw(img, nX, nY)
                   })
                   file.value = null
               }
               reader.readAsDataURL(wFile)
           },
           createImage (src, cb) {
	          const img = new Image()
               this.$el.append(img)
               img.className = 'base64-hidden'
               img.onload = () => {
	          	cb(img)
               }
              img.src = src
              this.$options.img = img
           },
           draw (img, x = 0, y = 0, scale = 0.5,deg = Math.PI ) {
	           const {ctx} = this.$options
               let {width, height} = this
               let imgW = img.offsetWidth
               let imgH = img.offsetHeight
               ctx.save()
	           ctx.clearRect( 0, 0, width, height)
	           ctx.translate( width / 2, height / 2, img)
//               ctx.rotate(deg)
               ctx.drawImage(img,  x,  y, imgW * 0.5, imgH* 0.5 )
               ctx.restore()
           },
           handleClip (e) {
               const {handleMove, $options} = this
               if (!$options.img) {
               	    return
               }
               Object.assign(this.$options, {
               	 x: e.screenX,
                 y: e.screenY
               })
            	on({
                    el: window,
                    type: 'mousemove',
                    fn: handleMove
                })
	           once({
                   el: window,
                   type: 'mouseup',
                   fn: (e) =>{
	                 Object.assign($options, {
                	    nX: $options.nX + $options.xV,
	                    nY: $options.nY + $options.yV,
                        xV: 0,
                        yV: 0
                    })
                    off({
                        el: window,
                        type: 'mousemove',
                        fn: handleMove
                    })
                   }
               })
           },
           handleMove (e){
               e.preventDefault()
               e.stopPropagation()
            	const {$options, draw} = this
            	Object.assign($options, {
            		xV: e.screenX  - $options.x,
                    yV: e.screenY - $options.y
                })
               draw($options.img, $options.nX + $options.xV, $options.nY + $options.yV)
           },
           clearState () {
	        const {$options, width, height} = this
           	if ($options.img) {
	            this.$el.removeChild($options.img)
	            Object.assign($options, {
		            x: 0,
		            y: 0,
		            xV: 0,
		            yV: 0,
		            nX: -width / 2,
		            nY: -height / 2,
		            img: null,
	            })
            }
           }
       }
   }
</script>
<style>
    @component-namespace jc {
        @component clip-image{
            position: relative;
            width: 100%;
            canvas {
                position: relative;
                width: 100%;
                height: 100%;
                cursor: pointer;
                box-shadow: 0 0 3px #333;
            }
            input {
                display: none;
            }
            .base64-hidden {
                position: absolute;
                top: 0;
                left: 0;
                display: block;
                width: 100%;
                height: auto;
                z-index: -999;
                opacity: 0;
            }
            .upload-warp {
            @utils-clearfix;
            .upload-btn,.upload-cancel {
                    float: left;
                    display:inline-block;
                    width: 60px;
                    height: 25px;
                    line-height: 25px;
                    color: #fff;
                    border-radius: 5px;
                    background: #49a9ee;
                    box-shadow: 0 0 0 #333;
                    text-align: center;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    margin: auto;
                    cursor: pointer;
                }
            .upload-cancel {
                background: gray;
                float: right;
            }
            }
        }
    }
</style>