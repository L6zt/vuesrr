<template>
    <div>
        <router-link to="/">////</router-link>
        <transition-group tag="div" class="ad-show" name="sc-sp">
            <section v-for="item in list" :key="item.key">
                {{item.id}} {{item.key}}
            </section>
        </transition-group>
        <div style="height: 100px"></div>
        <transition-group tag="div" class="ad-t-show" name="sc-t-sp">
            <section v-for="item in tList" :key="item.key">
                {{item.id}} {{item.key}}
            </section>
        </transition-group>
    </div>
</template>
<script>
    export default {
	    metaInfo () {
		    return {
			    title: '////',
			    meta: [
				    { vmid: 'description', name: 'description', content: '///' }
			    ]
		    }
	    },
        data () {
	    	return {
                list: [],
                tList: [],
                init: [
	                {id: 1},
	                {id: 2},
	                {id: 3},
	                {id: 4},
	                {id: 5},
	                {id: 6}
                ]
            }
        },
        methods: {
	    	initList () {
	    		this.list =this.init.map(item => {
	    			item = JSON.parse(JSON.stringify(item))
	    			item.key = Math.random().toString().slice(2)
	    			return item
                })
			    this.tList = this.init.map(item => {
				    item = JSON.parse(JSON.stringify(item))
				    item.key = Math.random().toString().slice(2)
				    return item
			    })

            },
            changeList () {
	    		const item = this.list.shift()
	            item.key = Math.random().toString().slice(2)
                this.list.push(item)
	    		setTimeout(this.changeList, 3000)
            },
            changeTlist () {
	            const item = this.tList.pop()
	            item.key = Math.random().toString().slice(2)
	            this.tList.unshift(item)
	            setTimeout(this.changeTlist, 3000)
            }
        },
        mounted () {
            this.initList()
            this.changeList()
            this.changeTlist()
        }
    }
</script>
<style>
    .ad-show {
        height: 60px;
        width: 200px;
        overflow: hidden;
        section {
            height: 20px;
            background: red;
        }
        .sc-sp-enter-active, .sc-sp-leave-active {
            transition: all .5s ease;
        }
        .sc-sp-leave-to {
          margin-top: -20px;
          /*height: 0;*/
          opacity: 0;
         }
    }
    .ad-t-show {
        height: 60px;
        width: 200px;
        overflow: hidden;
    section {
        height: 20px;
        background: red;
    }
    .sc-t-sp-enter-active, .sc-t-sp-leave-active {
        transition: all .5s ease;
    }
    .sc-t-sp-enter {
        opacity: 0;
        margin-top: -20px;
    }
     .sc-t-sp-enter-to {
         opacity: 1;
     }
    }
</style>