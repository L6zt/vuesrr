<template>
    <section class="jc-drag-sort" ref="content">
        <ul>
            <li class="jc-drag-sort-item" v-for="item, index in sort" @mousedown="start(index)" ref="item">
                {{item}}
            </li>
        </ul>
        <div class="create-dom" v-show="isDrag">
        {{index}}
        </div>
    </section>
</template>
<script>
    import {on, off} from '../../utils/dom'
    export default  {
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
			    index: null
		    }
        },
        methods: {
    	    start (index) {
    	    	this.index = index
                this.isDrag = true
                on({
                    el: window,
                    type: 'mousemove',
                    fn: this.move
                })
            },
            move (e) {

            },
            end (e) {

            }
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
                cursor: pointer;
                &:hover {
                    background: red;
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