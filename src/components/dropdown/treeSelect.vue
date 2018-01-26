<template>
    <div class="jc-tree-select"
         @click.prevent.stop="handleShow"
         v-clickOut="out"
    >
        {{`${name}` || `请选择`}}
        <tree-son
           :list="list"
           :isShow="isShow"
           direction="down"
           sonDirection="right"
           :kv="kv"
           :end="value"
        ></tree-son>
    </div>
</template>
<script>
    import treeSon from './treeSon.vue'
    const recursion = (ay, k, n) => {
            if (k !== '') {
            	const check = k.split('-')
                if (check[n]) {
            		const index = ay.findIndex(item => {
			            return item.k.toString() === check[n]
		            })
                    if (n < k.length - 1) {
	                    return n === 0 ? `${ay[index].v}${recursion(ay[index].child, k , ++n)}` :`-${ay[index].v}${recursion(ay[index].child, k , ++n)}`
                    }
	                return `${ay[index].v}`
                }
                return ''
            }
    }
    export default {
    	name: 'treeSelect',
    	props: {
    		list: {
    			type: Array,
                require: true
            },
            value : {
    			type: String,
                require: true
            }
        },
        data () {
    		return {
    			isShow: false,
                kv: '',
                name: ''
            }
        },
        created () {
    		this.$on('close', ({k, v}) => {
    		   this.isShow = false
               this.name = v
               this.$emit('input', k)
            })
        },
        watch: {
    		list: {
    			handler () {
    				this.init()
                },
			    immediate: true
            },
	        value: {
		        handler () {
			        this.init()
		        },
		        immediate: true
	        }
        },
        methods: {
	        handleShow () {
	        	this.isShow = !this.isShow
            },
            out () {
	        	console.log('  out  ')
	        	this.isShow = false
            },
            init () {
	            const nTree =  recursion(this.list || [], this.value, 0).split('-')
	            this.name = nTree[nTree.length - 1]
            }
        },
    	components: {
    		treeSon
        }
    }
</script>
<style>
    @component-namespace jc {
        @component tree-select {
            position: relative;
            width: 60px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            border: 1px solid #ccc;
            border-radius: 5px;
            background: #fff;
            cursor: pointer;
        }
        }
</style>