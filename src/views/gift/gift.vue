<template>
    <div class="gift-container">
        gift/ <router-link to="/">index</router-link>
        <!--模拟滚动 组件-->
        <section-container key="a">
          pc端滚动模拟 组件演示
          <template slot="content">
            <scroll-container
                :height="fHeight"
            >
                <section class="test-item" :class="index % 2 === 0 ? 'odd' : 'even' " v-for="index in num">
                </section>
            </scroll-container>
          </template>
        </section-container>

        <section-container key="b">
            pc 端 分页组件
            <template slot="content">
                <pagination
                        v-model="current"
                        :allPage="all"
                        :ssrHref="ssrHref"
                >
                </pagination>
            </template>
        </section-container>
        <section-container key="c">
            pc端 select 组件
            <template slot="content">
                <span>
                    点击事件 ：
                    <single-select
                         v-model="select.k"
                         :list="select.data"
                         key="a"
                     >
                </single-select>
                </span>
                <span>
                    hover 事件 :
                     <single-select
                        v-model="selectH.k"
                        :list="selectH.data"
                        trigger="hover"
                        key="b"
                       >
                </single-select>
                </span>
            </template>
        </section-container>
        <section-container>
            pc端 dialog 组件
            <div slot="content">
                <jc-dialog
                  v-model="isDialog"
                  tt="AAA BBB CCC DDD"
                >
                    <template slot="ct">
                        <p>
                            AAA BBB CCC DDD EEE FFF GGG
                        </p>
                    </template>
                </jc-dialog>
                <button @click="isDialog = !isDialog">
                    click
                </button>
            </div>
        </section-container>
        <section-container>
            轮播图 简单组件
            <div slot="content" style="position: relative; width: 300px; height: 200px">
                <simple-banner
                        :list="banner"
                >
                </simple-banner>
            </div>
        </section-container>
    </div>
</template>
<script>
    import  {mapState} from 'vuex'
    import scrollContainer from  '../../components/moboxscroll/index.vue'
    import pagination from '../../components/pagination.vue'
    import singleSelect from '../../components/dropdown/singleSelect.vue'
    import sectionContainer from '../../components/base/sectionContainer.vue'
    import jcDialog from '../../components/dialog.vue'
    import simpleBanner from '../../components/banner/simpleBanner.vue'
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
	        	fHeight: 200,
                num: 10,
                current: 1,
                all: 100,
                ssrHref: 'gift/test/:num?pageIndex=1&pageSize=10',
                isDialog: false,
                banner: [
                    {
                    	href: 'a',
                        src: require('../../assert/img/banner/banner-a.jpg')
                    },
	                {
		                href: 'c',
		                src: require('../../assert/img/banner/banner-b.jpg')
	                },
	                {
		                href: 'c',
		                src: require('../../assert/img/banner/banner-c.jpg')
	                }
                ],
                select: {
	        		k: null,
	        		data: [
                        {
                        	k: 'a',
                            v: 1
                        },
				        {
					        k: 'b',
					        v: 2
				        },
				        {
					        k: 'c',
					        v: 3
				        }
                    ]
                },
		        selectH: {
			        k: null,
			        data: [
				        {
					        k: 'a',
					        v: 1
				        },
				        {
					        k: 'b',
					        v: 2
				        },
				        {
					        k: 'c',
					        v: 3
				        }
			        ]
		        }
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
        components: {scrollContainer, pagination,singleSelect, sectionContainer, jcDialog, simpleBanner}
    }
</script>
<style>
.gift-container {
  padding: 0 10px;
  .test-item {
      height: 100px;
      &.odd {
         background: red;
       }
       &.even {
           background: blue;
      }
  }
}
</style>
