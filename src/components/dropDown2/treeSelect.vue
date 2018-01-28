<template>
    <div class="jc-tree-select"
         @click.prevent.stop="handleShow"
         v-clickOut="out"
    >
        {{`${name}` || `请选择`}}
        <tree-son
           :list="list"
           :isShow="isShow"
           :root="true"
           direction="down"
           sonDirection="right"
           :floor="floor"
           :chain="chain"
        ></tree-son>
    </div>
</template>
<script>
    import treeSon from './treeSon.vue'
    // 反解 value
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
                name: '',
                floor: 1,
                chain: this.value,
                triggerShowDown: false
            }
        },
        created () {
    		// 关闭 并结算 链值
    		this.$on('close', ({k, v}) => {
    		   this.isShow = false
               this.name = v
               this.$emit('input', k)
            })
            // 获取展开下级的 链 key
            this.$on('showDown', ({chain}) => {
            	this.chain = chain
                this.triggerShowDown = true
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
	        	if (this.triggerShowDown) {
			        this.triggerShowDown = false
                    this.chain = this.value
                }
	        	this.isShow = false
            },
            init () {
	            const nTree =  recursion(this.list || [], this.value, 0).split('-')
	            this.name = nTree[nTree.length - 1]
                this.chain = this.value
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