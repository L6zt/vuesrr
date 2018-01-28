<template>
    <div class="bi-tm-warp">
    </div>
</template>
<script>
    import {addClass} from '../../utils/dom'
    export default {
    	k: false,
    	data () {
    		return {
			    list: [
				    {text: 1, active: false}
			    ]
            }
        },
        methods: {
    		remove (index) {
    			const {list} = this
                list.splice(index, 1)
                console.log(index)
            }
        },
        watch: {
        },
        mounted () {
    		const {list} = this
        }
    }
</script>
<style>
.bi-tm-warp {
    position: absolute;
    width: 300px;
    height: 100px;
    overflow: hidden;
    .left-go {
        position: absolute;
        right: 0;
        left: 100%;
        transition: 10s all ease;
        font-size: 24px ;
        &.active {
            transform: translateX(-500px) translateY(0) translateZ(0);
         }
    }
}
</style>