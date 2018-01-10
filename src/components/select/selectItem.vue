<template>
    <div class="jc-select-item" @click="handleClick">
        <i
                class="jc-select-item-status"
                :class="{'is-active': isSelect}"
        ></i>{{dt.v}}
    </div>
</template>
<script>
    export default {
        props: {
        	dt: {
        		type: Object,
                require: true
            },
            value: {
        		require: false
            },
            isGroup: {
        		type: Boolean,
                require: false,
                default: false
            }
        },
        data () {
        	const {dt, value} = this
        	return {
        		isSelect: dt.k === value
            }
        },
        watch: {
        	value (v) {
        		this.isSelect = this.dt.k === v
            }
        },
        created () {
        	this.isGroup && this.sendFather('selectGroup', {
        		event: 'select-item-in',
		        playLoad: this
            })
        },
        methods: {
           handleClick () {
           	  const {isSelect, isGroup} = this
               if (isGroup) {
           	  	 this.sendFather('selectGroup', {
           	  	 	event: 'select-item-change',
	                 playLoad: this
                 })
                   return
               }
               if (!isSelect) {
	               this.$emit('input', this.dt.k)
               } else {
           	    	this.$emit('input', null)
               }
	           this.isSelect = !isSelect
           }
        },
        mounted () {
        },
        destroyed () {
        	this.sendFather('selectGroup', {
        		event: 'select-item-out',
		        playLoad: this
            })
        }
    }
</script>
<style>
    @component-namespace jc-select {
        @component item {
            position: relative;
            display: inline-block;
            min-width: 80px;
            height: 30px;
            line-height: 30px;
            padding-left: 25px;
            cursor: pointer;
            @descendent status {
                display: block;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 5px;
                margin: auto;
                width: 10px;
                height: 10px;
                border: 1px solid #ccc;
                border-radius: 50%;
                @when active{
                    &::after {
                      content: '';
                      display: block;
                      position: absolute;
                      left: 0;
                      right: 0;
                      top: 0;
                      bottom: 0;
                       margin: auto;
                      width: 5px;
                      height: 5px;
                      background: red;
                      border-radius: 50%;
                     }
                }
            }
        }
    }
</style>