<template>
    <div class="u-utilityName">
        socket
    </div>
</template>
<script>
    import io from 'socket.io-client'
    export default  {
    	$socket: null,
        data () {
    		return {}
        },
    	mounted () {
		    const socket = io('http://ssrv.jcmark.cn', {
		    	cookie: false
            })
            this.$options.$socket = socket
            socket.on('init',(data) => {
            	console.log(data)
            })
        },
        destroyed () {
    		const {$socket} = this.$options
            $socket.close()
        }
    }
</script>
<style>
    /*@utility utilityName {*/
        /*color: green;*/
    /*}*/

</style>