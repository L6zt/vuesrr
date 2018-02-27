<template>
    <div>
        farther
        <div style="color: red">
            <slot></slot>
        </div>
    </div>
</template>
<script>
	import schema from 'async-validator'
    export default {
    	name: 'jcForm',
        props: {
    	    formData: Object,
            formRule: Object
        },
	    _chList: {},
        data () {
    		return {
    			// 子实例列表
                _chList: {}
            }
        },
    	created () {
		    const {$options: {_chList}} = this
    		this.$on('add', (playLoad) => {
    			let {prop} = playLoad
//                if (_chList[`${prop}`]) {
//    				throw ('表单子节点重复')
//                    return
//                }
                _chList[`${prop}`] = playLoad
            })
            this.$on('dele', (playLoad) => {
            	const {_chList} = this
                const {key} = playLoad
                delete _chList[key]
            })
        },
        methods: {
	        validatorFields ({fileds, options = {}}) {
	        	const {formRule, formData, $options: {_chList}} = this
		        fileds =  fileds ?  fileds : Object.keys(_chList)
                const vfList = fileds.map(item => {
                	return new Promise((r, j) => {
                		const desc = {}
                		desc[`${item}`] = formRule[item]
		                const validator = new schema(desc)
		                validator.validate(formData,options, (errors, fields) => {
			                if(errors) {
				                _chList[item].$emit('msg', errors.map(item => item.message).join(',').replace(/,$/, ''))
			                	j({
                                    status: !!0,
                                    errors,
                                    fields
                                })
                                return
			                }
			                _chList[item].$emit('msg', '')
				                r({status: !!1})
		                })
                    })
                })
                return Promise.all(vfList)
            },
            clearValidator() {
	           Object.keys(this._chList).forEach(k => {
	           	 this._chList[k].$emit('msg', '')
               })
            }
        }
    }
</script>