<template>
    <div class="jc-switch-container" @click="click" :class="{'is-active': on}">

    </div>
</template>
<script>
    export default  {
    	data () {
    		return {
    			on: false
            }
        },
        methods: {
    		click () {
    			this.on = !this.on
            }
        }
    }
</script>
<style>
    @component-namespace jc {
         @component switch-container {
             position: relative;
             width: 40px;
             height: 15px;
             line-height: 15px;
             border: 1px solid #ccc;
             border-radius: 10px;
             cursor: pointer;
             transition: all .3s ease;
             @when active {
                background: greenyellow;
                &::after {
                 transform: translate(20px, 0);
                 }
             }
             &::after {
                display: block;
                transition: all .3s ease;
                content: '';
                position: absolute;
                top: 0;
                bottom: 0;
                margin-top: -2.5px;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0 3px #333;
              }
         }
    }
</style>