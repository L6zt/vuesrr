    <template>
        <!--主 器-->
        <div class="jc-tree-son-select"
             :class="`drop-${layDirection}`"
             v-if="isShow"
        >
            <section v-for="item, index in list"
                     v-if="item.child"
                     :key="index"
                     @click.stop.prevent="handleShow(index)"
                     class="tree-son-item"
            >
                {{item.v}}
                <tree-son
                        :list="item.child"
                        :isShow="index === showIndex"
                        :fartherMsg="item"
                        :sonDirection="sonDirection"
                        :kv="`${kv ? `${kv}-` : ''}${item.k}`"
                        :end="end"
                ></tree-son>
            </section>
            <section
                    class="tree-son-item"
                    @click.stop.prevent="select(item)"
                    :class="{'fk-active': `${kv ? `${kv}-` : ''}${item.k}` === end}"
                    :key="index"
                    v-else
            >
                {{item.v}}
            </section>
        </div>
    </template>
    <script>
        export default {
        	name: 'treeSon',
        	props: {
        		// 列表
        		list: {
        			type: Array,
                    require: true
                },
                kv: {
        			require: true
                },
                end: {
        			type: String,
                    default: ''
                },
                proxyNode: {
                },
                isShow : {
        			require: false
                },
                direction: {
                    default: false
                },
                sonDirection: {
                    default: false
                },
                fartherMsg: {
        			require: false,
                    default () {
        				return {}
                    }
                }
            },
        	data () {
        		return {
                    showIndex: null,
                }
            },
            watch: {
        		isShow (v) {
        			if (v === false) {
        				this.showIndex = null
                    }
                }
            },
            computed: {
        		layDirection () {
        			const {direction, sonDirection} = this
        			if (direction) {
        				return direction
                    }
                    return sonDirection
                }
            },
            methods: {
	            handleShow (index) {
	            	this.showIndex = index
                },
                close (index) {

                },
                select (item) {
	            	const {kv} = this
                    const {k, v} = item
	            	this.showIndex = null
                    this.sendFather('treeSelect', {
                    	event: 'close',
                        playLoad: {
                    		k: `${kv ? `${kv}-` : ''}${k}`,
                            v
                        }
                    })
                }
            },
            mounted () {
        		console.log(this.end)
            }
        }
    </script>
    <style>
        @component-namespace jc {
            @component tree-son-select {
                position: absolute;
                width: 100%;
                background: #333;
                color: #fff;
                box-sizing: border-box;
                box-shadow: 0 0 1px #ccc;
                z-index: 999;
                .tree-son-item {
                    position: relative;
                    height: 25px;
                    line-height: 25px;
                    text-align: center;
                    cursor: pointer;
                    &:hover {
                      background: red;
                     }
                    &.fk-active {
                      background: red;
                     }
                }
                &.drop-right {
                   left: 100%;
                   top: 0;
                 }
                &.drop-down {
                  top: 100%;
                   left: 0;
                 }
            }
        }
    </style>