<template>
    <div>
        <section>
            <slot></slot>
        </section>
       <section style="color: red">
           {{msg}}
       </section>
    </div>
</template>
<script>
    // 正则
    import schema from 'async-validator'
    export default {
    	name: 'jcFormItem',
        props: {
    		prop: String
        },
        data () {
    		return {
    			msg: ''
            }
        },
        watch: {
    		prop (nV, oV) {
                if(nV !== oV) {
	                this.sendFather('jcForm', {event: 'del', playLoad: {key: oV}})
	                nV && this.sendFather('jcForm', {event: 'add', playLoad: this})
                }
            }
        },
        created () {
            this.prop && this.sendFather('jcForm', {event: 'add', playLoad: this})
        },
    }
</script>