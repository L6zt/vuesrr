<template>
    <div class="gift-container">
        gift/ <router-link to="/">index</router-link>
        <pre>{{isLogin}}</pre>
        <button @click="change">click</button>
        <scroll-container
            :height="fHeight"
        >
            <section class="test-item" :class="index % 2 === 0 ? 'odd' : 'even' " v-for="index in num">
            </section>
        </scroll-container>
    </div>
</template>
<script>
    import  {mapState} from 'vuex'
    import scrollContainer from  '../../components/moboxscroll/index.vue'
    export default  {
	    asyncData ({store}) {
		    return store.dispatch ('auth/login',  {
			    name: 'react',
			    password: '97019jiao'
		    }).then(data => {
			    console.log(data, 'gift')
			    return data
		    }).catch(e => {
			    console.log('e', e)
		    })
	    },
        data () {
	        return {
	        	fHeight: 500,
                num: 10
            }
        },
	    computed: {
		    ...mapState('auth', {
			    isLogin (state) {
				    return state.isLogin
			    }
		    })
	    },
        methods: {
	    	change () {
	    		this.num =  1 * (Math.random().toString().replace(/0.[0]?/ , '').substr(1, 2))
                console.log(this.num)
            }
        },
        components: {scrollContainer}
    }
</script>
<style>
    .test-item {
        height: 100px;
        &.odd {
           background: red;
         }
         &.even {
             background: blue;
        }
    }
</style>