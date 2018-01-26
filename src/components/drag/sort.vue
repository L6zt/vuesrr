<template>
    <section class="jc-drag-sort" ref="content">
        <ul>
            <!--@dragover="dragover(index)"-->
            <li class="jc-drag-sort-item"
                v-for="item, index in sort"
                @dragstart="dragstart(index, $event)"
                @drop="drop(index, $event)"
                @dragend="dragend(index, $event)"
                @dragenter="dragenter(index, $event)"
                @dragover.stop.prevent
                draggable="true"
                :class="{'active': index === mvIndex}"
                ref="item">
                {{item}}
            </li>
        </ul>
        <!--<div class="create-dom" v-show="isDrag">-->
        <!--{{index}}-->
        <!--</div>-->
    </section>
</template>
<script>
    import {on, off} from '../../utils/dom'
    export default  {
    	orgAry: null,
    	data () {
    		return {
			    sort: [
				    'a',
				    'b',
				    'c'
			    ],
			    style: {
				    background: 'blue'
			    },
			    isDrag: false,
			    oIndex: null,
                mvIndex: null
		    }
        },
        methods: {
	        dragstart (index, e) {
	        	// 初始化
                event.stopPropagation()
                //e.preventDefault()
	        	const orgAry = this.$options.orgAry = JSON.parse(JSON.stringify(this.sort))
    	    	this.oIndex = index
                this.isDrag = true
//                this.sort = orgAry.map((item, index) => {
//	        		if (index === this.index) {
//	        			return ''
//                    }
//                    return item
//                })
            },
	        dragenter (index, e) {
		        e.preventDefault()
                const {$options: {orgAry}, oIndex} =  this
                const result =  [...orgAry]
                const replace =  result.splice(oIndex, 1, orgAry[index])[0]
                result.splice(index, 1, replace)
                this.sort = result
                this.mvIndex = index
            },
	        dragleave (index, e) {
                this.mvIndex = null
            },
	        dragend (index, e) {
		        this.oIndex = null
		        this.mvIndex = null
            },
	        drop (index, e) {
		        e.preventDefault()
                console.log(index, 'end')
                if (index === this.oIndex) {
		        	this.sort = this.$options.orgAry
                } else  {
                    this.dragenter(index, e)
                }
                this.oIndex = null
                this.mvIndex = null
	        },
        }
    }
</script>
<style>
    @component-namespace jc {
        @component drag-sort {
            position: relative;
            width: 100px;
            color: #fff;
            text-align: center;
            @descendent item {
                position: 100%;
                height: 40px;
                line-height: 40px;
                background: #333;
                cursor: pointer !important;
                &:hover {
                    background: red;
                 }
                &.active{
                 opacity: 0.5;
                 }
            }
        }
        .create-dom {
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            height: 40px;
            line-height: 40px;
            z-index: 999;
            background: blue;
        }
    }
</style>