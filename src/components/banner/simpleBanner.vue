<template>
    <div class="jc-simple-banner">
        <transition name="slide">
            <router-link  :key="index" :to="list[index].href" class="jc-simple-banner-item">
                <img :src="list[index].src" alt="">
            </router-link>
        </transition>
        <section v-if="list && list.length" class="jc-pq-warp">
            <i
                    :class="{'pq-active': index === i}" v-for="(item, i) in list"
                    @mouseover="select(i)"
                    @mouseout="init"
            >
            </i>
        </section>
    </div>
</template>
<script>
    export default  {
    	k: null,
        props: {
        	list: {
        		type: Array,
                default: []
            }
        },
        data () {
        	return {
        		index: 0
            }
        },
        methods: {
    		select (index) {
			    clearInterval(this.$options.k)
    			this.index = index
            },
            init () {
	            this.$options.k = setInterval(() => {
		            const {length} = this.list
		            this.index = (this.index + 1) % length
	            }, 2000)
            }
        },
        mounted () {
    		this.init()
        },
        destroyed () {
    		clearInterval(this.$options.k)
        }
    }
</script>
<style>
    @component-namespace jc {
        @component simple-banner {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
            .jc-pq-warp {
                position: absolute;
                width: 100%;
                bottom: 10px;
                left: 0;
                text-align: center;
                i {
                    display: inline-block;
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #ccc;
                    margin-right: 5px;
                    cursor: pointer;
                    &.pq-active{
                        background: #49a9ee;
                     }
                }
            }
            @descendent item {
                position: absolute;
                top: 0;
                width: 100%;
                height: 100%;
            }
            .slide-enter-active {
                transition: all .5s ease;
            }
            .slide-enter {
                transform: translate(100%, 0);
            }
            .slide-leave-active {
                transform: translate(-100%, 0);
                transition: all .5s ease;
            }
            img {
                display: block;
                width: 100%;
            }
        }
    }
</style>