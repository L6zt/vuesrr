<template>
    <div class="jc-clip-image" :style="{width: `${clip.width}`}">
        <canvas ref="ctx"
                :width="clip.width"
                :height="clip.height"
                @mousedown="handleClip($event)"
        >
        </canvas>
        <input type="file" ref="file" @change="readFileMsg($event)">
        <div class="clip-scale-btn">
            <a class="add" @click="handleScale(false)">+</a>
            <a @click="rotate" class="right-rotate">转</a>
            <a class="poor" @click="handleScale(true)">-</a>
            <span>{{scale}}</span>
        </div>
        <div class="upload-warp">
            <a class="upload-btn" @click="dispatchUpload($event)">upload</a>
            <a class="upload-cancel">cancel</a>
        </div>
        <div class="create-canvas">
            <a class="to-send-file" @click="outFile" title="请打开控制台">生成文件</a>
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
            base64: null,
            scale: 1.5,
            deg: 0
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
	       rotate () {
               const {$options, draw} = this
               this.deg = (this.deg + Math.PI /2)% (Math.PI * 2)
		       draw($options.img, $options.nX + $options.xV, $options.nY + $options.yV, this.scale, this.deg)
           },
       	    handleScale (flag) {
	            const {$options, draw, deg} = this
	            flag && this.scale > 0.1 && (this.scale = this.scale - 0.1)
	            !flag && this.scale < 1.9 && (this.scale = this.scale + 0.1)
	            $options.img &&  draw($options.img, $options.nX + $options.xV, $options.nY + $options.yV, this.scale, deg)
            },
            dispatchUpload (e) {
	            this.clearState()
            	const {file} = this.$options
            	e.preventDefault()
                file.click()
            },
           readFileMsg () {
	           const {file} = this.$options
               const {draw, createImage, $options: {nX, nY}, scale, deg} = this
               const wFile = file.files[0]
               const reader = new FileReader()
               reader.onload = (e) => {
                   const img = createImage(e.target.result, (img) => {
	                   draw(img, nX, nY, scale, deg)
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
               ctx.rotate(deg)
               ctx.drawImage(img,  x,  y, imgW * scale, imgH * scale)
               ctx.restore()
           },
           handleClip (e) {
               const {handleMove, $options, deg} = this
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
                   	console.log('down')
	                 switch (deg) {
		                   case 0: {
			                   Object.assign($options, {
				                   nX: $options.nX + $options.xV,
				                   nY: $options.nY + $options.yV,
				                   xV: 0,
				                   yV: 0
			                   })
			                   break;
		                   }
		                   case Math.PI / 2: {
			                   Object.assign($options, {
				                   nX: $options.nY + $options.yV,
				                   nY: $options.nX - $options.xV,
				                   xV: 0,
				                   yV: 0
			                   })
			                   break;
		                   }
		                   case Math.PI: {
			                   Object.assign($options, {
				                   nX: $options.nX - $options.xV,
				                   nY: $options.nY - $options.yV,
				                   xV: 0,
				                   yV: 0
			                   })
			                   break;
		                   }
		                   default: {
		                   	// $options.nY - $options.yV, $options.nX + $options.xV
			                   Object.assign($options, {
				                   nX: $options.nY - $options.yV,
				                   nY: $options.nX + $options.xV,
				                   xV: 0,
				                   yV: 0
			                   })
		                   }
	                   }
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
               const {$options, draw, scale, deg} = this
	           Object.assign($options, {
		           xV: e.screenX  - $options.x,
		           yV: e.screenY - $options.y
	           })
	           switch (deg) {
		           case 0: {
			           draw($options.img, $options.nX + $options.xV, $options.nY + $options.yV, scale, deg)
			           break;
		           }
		           case Math.PI / 2: {
			           draw($options.img, $options.nY + $options.yV, $options.nX - $options.xV, scale, deg)
			           break;
		           }
		           case Math.PI: {
			           draw($options.img, $options.nX - $options.xV, $options.nY - $options.yV, scale, deg)
			           break;
		           }
		           default: {
			           draw($options.img, $options.nY - $options.yV, $options.nX + $options.xV,  scale, deg)
			           break;
		           }
	           }
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
           },
           outFile () {
           	    const {$refs: {ctx}} = this
                console.log(ctx.toDataURL())
	           ctx.toBlob((blob) => {console.log(blob)})
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
            .clip-scale-btn {
                position: relative;
            @utils-clearfix;
             margin-bottom: 5px;
                text-align: center;
                a {
                    float: left;
                    width: 20px;
                    height: 20px;
                    border-radius: 50%;
                    color: #fff;
                    background: #49a9ee;
                    text-align: center;
                    cursor: pointer;
                }
             &>.poor, &>.right-rotate {
                float: right;
             }

            &>span{
            position: absolute;
            z-index: -9;
            top: 0;
            left: 0;
               display: block;
               position: relative;
                width: 100%;
                 text-align: center;
               height: 20px;
               line-height: 20px;
            }
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
                    margin-top: 5px;
                }
            .upload-cancel{
                background: gray;
                float: right;
            }
            }
            .to-send-file {
                margin-top: 5px;
                display: block;
                width: 50px;
                height: 25px;
                line-height: 25px;
                color: #fff;
                border-radius: 5px;
                background: #49a9ee;
                cursor: pointer;
            }
        }
    }
</style>