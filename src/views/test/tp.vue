<template>
    <div>
        <div style="width: 600px; overflow: hidden; height: 200px; position: relative">
            <transition-group :name="fx" tag="div" class="gba" :style="{width: `${200 * (list.length + 1)}px`}">
                <section
                        v-for="item, index in list"
                        :key="item.k"
                        :class="`a${item.v}  ${index === 1 ? 'scale' : 'min-scale'}`"

                >
                </section>
            </transition-group>
            <div class="other-pg">
                <i v-for="index in list.length" :class="{active: pageN === index -1}" @click="mouse(index)"></i>
            </div>
        </div>
        <button  @click="click(0)">left</button>
        <button  @click="click(1)">right</button>
    </div>
</template>
<script>
    export default {
    	data () {
    		return {
    			list: [
    				{k: 1, v: 1},
                    {k: 2, v: 2},
                    {k: 3, v:3},
				    {k: 4, v:4},
				    {k: 5, v:5},
    			],
                fx: 'sld',
                pageN: 0
            }
        },
        methods: {
    		click (f) {
    			let {list: {length: lg}, pageN} = this
    			 if (f === 0) {
    				this.pageN =  (++pageN) % lg
    			 	this.fx = 'sld'
				     const item = this.list.shift()
				     item.k = Math.random()
				     this.list.push(item)
                 } else {
				     this.pageN =  Math.abs(--pageN < 0 ? lg - 1 : pageN) % lg
				     this.fx = 'slda'
				     const item = this.list.pop()
				     item.k = Math.random()
				     this.list.unshift(item)
                 }
            },
            mouse (i) {
                // this.pageN
                const fn = (f) => {
                    if (this.pageN === i - 1)
                    	return
	                this.click(f)
	                setTimeout(() => {
		                fn(f)
                    }, 0)
                }
               if (this.pageN < i - 1) {
	               fn(0)
               } else {
                	fn(1)
               }
            }
        }
    }
</script>
<style>
    .other-pg {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
       text-align: center;
      z-index: 999;
    i {
        display: inline-block;
        height: 5px;
        width: 5px;
        border-radius: 100%;
        border: 1px solid #ccc;
        margin-left: 5px;
    &.active {
         background: yellowgreen;
     }
    }
    }
    .gba {
        position: relative;
        height: 200px;
        section {
            position: relative;
             width: 200px;
             height: 200px;
             display: inline-block;
             float: left;
            transition: margin-left  .3s ease,transform .3s ease;
            &.a1{
             background: rosybrown;
             }
            &.a2{
                 background:  yellow;;
             }
             &.a3{
                 background: greenyellow;
             }
    &.a4{
         background: royalblue;
     }
        }
      .scale {
          transform: scale(1, 1);
          transform-origin: 50% 50%;
          background: red;
          z-index: 99;
      }
      .min-scale {
          transform: scale(0.8, 0.8);
          transform-origin: 50% 50%;
          background: red;
          z-index: 99;
      }
      .sld-leave-to {
          margin-left:  -200px;
      }
      .slda-enter {
        margin-left:  -200px;
      }
    }
</style>