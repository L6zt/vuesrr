<template>
    <div class="index-container" v-clickOut="clickOut">
        <h3>
            {{isLogin}}
        </h3>
         <router-link to="auth/login">login</router-link>////
         <router-link to="/gift">gift</router-link>
    </div>
</template>
<script>
    import {mapState} from 'vuex'
    export default {
    	data () {
    		return {
    			msg: 'index'
            }
        },
	    asyncData ({store}) {
	    	console.log(this)
	    	return store.dispatch ('auth/login',  {
			    name: 'react',
			    password: '97019jiao'
		    }).then(data => {
            	console.log(data, 'index')
            	return data
            }).catch(e => {
            	console.log('e', e)
            })
	    },
        computed: {
            ...mapState('auth', {
            	isLogin (state) {
            		return state.isLogin
                }
            })
        },
        methods: {
    		clickOut () {
    			console.log('xxx')
            }
        }
    }

</script>