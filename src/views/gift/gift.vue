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
        <section-container>
            折叠组件
            <template slot="content">
                <spread-transition>
                    <div v-show="am">
                        xxxxxxxxxxxxxxx
                        bbbbbbbbbbbbb
                        ccccccccccc
                        eeeeeeeee
                    </div>
                </spread-transition>
                <button @click="tn">
                    click{{am}}
                </button>
            </template>
        </section-container>
        <section-container>
            loading 组件
            <template slot="content">
                <simple-load></simple-load>
            </template>
        </section-container>
        <section-container>
                loading cnavas 组件
                <template slot="content">
                    <canvas-load></canvas-load>
                </template>
       </section-container>
     <section-container>
        单选 组件
        <template slot="content">
            <pre style="display:block;height: 20px;line-height: 20px;">{{st.k}}</pre>
            <select-item
                    v-for="item, index in st.list"
                    :dt="item"
                    :key="index"
                    v-model="st.k"
            >
            </select-item>
        </template>
    </section-container>
    <section-container>
            多选 组件
            <template slot="content">
                <pre  style="display:block;height: 20px;line-height: 20px;">{{(gp || []).join('|')}}</pre>
                <select-group
                    max="2"
                    min="1"
                    v-model="gp"
                >
                    <select-item
                            v-for="item, index in st.list"
                            :dt="item"
                            :key="index"
                            :isGroup="true"
                    >
                    </select-item>
                </select-group>
            </template>
     </section-container>
        <section-container>
            全局 tip
            <template slot="content">
                <button @click="tip">click</button>
            </template>
        </section-container>
        <section-container>
           switch
            <template slot="content">
                <jc-switch></jc-switch>
            </template>
        </section-container>
        <section-container>
            树形 选择
            <template slot="content">
                <pre>{{treeEnd}}</pre>
                <tree-select
                        :list="treeSelect"
                        v-model="treeEnd"
                >
                </tree-select>
            </template>
        </section-container>
        <section-container>
            裁切图片
            <template slot="content">
              <clip-image></clip-image>
            </template>
        </section-container>
        <section-container>
            滑块
            <template slot="content">
                <slide></slide>
            </template>
        </section-container>
        <section-container>
            拖拽
            <template slot="content">
                <drag-sort></drag-sort>
            </template>
        </section-container>
        <section-container>
            弹幕
            <template slot="content">
                <tm></tm>
            </template>
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
    import spreadTransition from '../../components/spreadTransition.vue'
    import simpleLoad from '../../components/loading/simpleLoad.vue'
    import selectItem from '../../components/select/selectItem.vue'
    import selectGroup from '../../components/select/selectGroup.vue'
    import canvasLoad from '../../components/loading/canvasload.vue'
    import dragSort from '../../components/drag/sort.vue'
    import jcSwitch from '../../components/switch/swith.vue'
    import clipImage from '../../components/clip/clipImage.vue'
    import slide from '../../components/slide/slide.vue'
    import treeSelect from '../../components/dropdown/treeSelect.vue'
    import tm from '../../components/tm/tm.vue'
    export default  {
	    asyncData ({store}) {
		    return store.dispatch ('auth/login',  {
			    name: 'react',
			    password: '97019jiao'
		    }).then(data => {
			    return data
		    }).catch(e => {
		    })
	    },
        data () {
	        return {
	        	fHeight: 200,
                num: 10,
                current: 1,
                all: 1000,
                ssrHref: 'gift/test/:num?pageIndex=1&pageSize=10',
                isDialog: false,
                gp: [],
                st: {
	        		k: null,
                    list: []
                },
		        am: false,
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
	        		k: 'b',
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
			        k: 'b',
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
            },
            tn () {
	    		this.am = !this.am
                console.log('am')
            },
            tip () {
	            this.$log({type: 'warn', content: '警告'})
            }
        },
        mounted () {
	    	setTimeout(() => {
	    		this.st.list = [{v: 1, k: 1}, {v: 3, k: 3}, {v: 2, k:2}, {v: 6, k: 6}]
                this.gp = [3, 1]
            }, 3000)
        },
        components: {tm, treeSelect,slide,scrollContainer, pagination,singleSelect, sectionContainer, jcDialog, simpleBanner, spreadTransition, simpleLoad, selectItem,  selectGroup, canvasLoad, dragSort, jcSwitch,clipImage }
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
