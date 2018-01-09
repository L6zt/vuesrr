<template>
    <div
    class="jc-single-select-warp"
     @click="handleShow('click')"
     @mouseenter="handleShow('hover')"
     @mouseleave="close('hover')"
     v-clickOut="close"
     >
        <section class="jc-single-select-text">
            {{`${text||'请选择'}`}}
        </section>
        <section class="jc-single-select-box" v-show="isShow">
            <ul class="jc-single-select-list">
                <li v-for="(item, index) in list" @click.stop.prevent="select(item.k)"
                    class="jc-single-select-item"
                    :class="{active: item.k === value}">
                    {{item.v}}
                </li>
            </ul>
        </section>
    </div>
</template>
<script>
  /*
    ************** *************
    @param list ==> 数据列表
    @param value ==> list[number].k
    **************** ***************
    事件
    mouseover :: mouseout
    mouseenter :: mouseleave
  */
    export default  {
    	props: {
    		list: {
    			type: Array,
                default: []
            },
            value: {
    			required: false,
                type: String
            },
            trigger: {
    			type: String,
                default: 'click'
            }
        },
        data () {
    		return {
    			isShow: false
            }
        },
        computed: {
    		text () {
    			const {list} = this
    			const index = list.findIndex(item => item.k === this.value)
                if (index === -1) {
    				return null
                }
                return list[index]['v']
            }
        },
        methods: {
    		select (index) {
    			this.$emit('input', index)
	            this.close()
            },
	        handleShow (type) {
    			console.log('AAA')
    			const {trigger} = this
                if (type === trigger) {
	                this.isShow = true
                }
                return
            },
            close (type) {
	            const {trigger} = this
    			if (type === 'hover' && trigger !== type){
	            	return
                }
	            this.isShow = false
            }
        }
    }
</script>
<style>
  @component-namespace jc {
    @component single-select {
      @descendent warp {
        position: relative;
        display: inline-block;
        width: 80px;
        height: 25px;
        line-height: 25px;
        border: 1px #ccc  solid;
        text-align: center;
        border-radius: 5px;
        cursor: pointer;
      }
      @descendent box {
          position: absolute;
          width: 100%;
          left: 0;
          top: 0;
          padding-top: 30px;
      }
      @descendent text {
          position: relative;
          width: 100%;
          height: 100%;
      }
      @descendent list{
          border: 1px solid #ccc;
          border-radius: 5px;
      }
      @descendent item {
          position: relative;
          padding: 0 5px;
          height: 25px;
          line-height: 25px;
          cursor: pointer;
          background: #fff;
          &.active, &:hover {
              background: #66b1ff;
              color: #fff
          }
      }
    }
  }
</style>
