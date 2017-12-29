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
            socket.emit('join exchange', {name: Math.random().toString().slice(3)})
            socket.on('join exchange cb', (data) => {
            	console.log('join exchange cb', data)
	            socket.emit('join room', 'jc')
	            socket.on('join room cb', (data) => {
		            console.warn('join room cb', data)
	            })
                socket.on('other join room', data => {console.log('other room', data)})
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