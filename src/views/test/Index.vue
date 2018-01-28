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
        <div class="in" v-for="item, index in v" :key="index">
            <input type="text" :value="item.a" @input="inp(index,'a' ,$event)">
            <input type="text" :value="item.b" @input="inp(index, 'b',$event)">
            <input type="text" v-model="item.c" disabled>
            <button @click="del(index)">del</button>
        </div>
        <button @click="addV">
            add+++
        </button>
        <select-group
        v-model="treeEnd"
        :list="treeSelect"
        ></select-group>
    </div>
</template>
<script>
    import selectGroup from '../../components/dropDown2/treeSelect.vue'
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
                v: [{
                	a: null,
                    b: null,
                    c: null
                }],
                init: [
	                {id: 1},
	                {id: 2},
	                {id: 3},
	                {id: 4},
	                {id: 5},
	                {id: 6}
                ],
			    treeEnd: 'ui',
			    treeSelect: [
				    {k: 'a', v: 'a', child: [
					    {k: 'b', v: 'b'},
					    {k:'c', v: 'c'}
				    ]},
				    {k: 'z', v: 'z', child: [
					    {k: 'b', v: '1',
						    child: [
							    {k: 31, v: 310},
							    {k: 32, v: 320}
						    ]},
					    {k:'c', v: '2'},
					    {k: 3, v: 3, child: [
						    {k: 31, v: 310},
						    {k: 32, v: 320}
					    ]}
				    ]},
				    {k: 'ui', v: 'ui'}
			    ]
            }
        },
        components: {selectGroup},
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
            },
            inp (index,tg ,e) {
	    		const value = e.target.value
	    		if (tg === 'a') {
	    			this.v[index]['a'] = value
                    this.v[index]['b'] = 2 * value
                } else {
				    this.v[index]['a'] = value / 2
				    this.v[index]['b'] = value
                }
                this.v[index]['c'] = parseFloat(this.v[index]['a']) + parseFloat(this.v[index]['b'])
            },
            addV () {
	    		this.v.push({
                    a: null,
                    b: null,
                    c: null
                })
            },
	        del (index) {
	    		this.v.splice(index, 1)
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