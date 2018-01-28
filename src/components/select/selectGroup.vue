<template>
    <div class="jc-select-group">
        <slot></slot>
    </div>
</template>
<script>
    export default {
	    name: 'selectGroup',
	    list: [],
    	props: {
    		// 选择列表
    		value: {
    			type: Array,
                default: []
            },
            min: {
    			type:  String,
                require: false,
                default: null
            },
            max:  {
	            type:  String,
	            require: false,
	            default: null
            },
        },
        data () {
    		const {value} = this
    		return {
    			cSelect: value
            }
        },
        watch: {
    		value (v) {
    			this.cSelect = v
                this.check()
            }
        },
        methods: {
    		check () {
			    const {cSelect, $options: {list}} = this
			    list.forEach(vm => {
				    const index = cSelect.findIndex(item => {
					    return item  === vm.dt.k
				    })
				    if (index !== -1) {
					    vm.isSelect = true
				    }  else {
					    vm.isSelect = false
				    }})
            }
        },
    	created () {
    		this.$on('select-item-in', (vm) => {
    			const {$options: {list}} = this
                list.push(vm)
                this.check()
            })
            this.$on('select-item-out', (vm) => {
            	const {list} = this.$options
                const index = list.findIndex(item => {
                	return item === vm.dt.k
                })
                list.splice(index, 1)
            })
            this.$on('select-item-change', (vm) => {
	           const {cSelect, min, max} = this
               const lg = cSelect.length
               const {isSelect, dt} = vm
               let index = cSelect.indexOf(dt.k)
	               if (index === -1) {
		                if (isSelect === false) {
			               if ( lg < parseInt(max)) {
				               cSelect.push(dt.k)
				               this.$emit('input', cSelect)
                           }
                        } else {
		                	let index = cSelect.indexOf(dt.k)
                            cSelect.splice(index,1)
                            this.$emit('input', cSelect)
                        }
	               } else {
		               if (isSelect === true) {
			               let index = cSelect.indexOf(dt.k)
			               cSelect.splice(index,1)
			               this.$emit('input', cSelect)
		               }
	               }
            })
        }
    }
</script>
<style>

</style>