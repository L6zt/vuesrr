    <template>
        <!--主 器-->
        <div class="jc-tree-son-select"
             :class="`drop-${layDirection}`"
             v-if="show"
        >
            <section v-for="item, index in list"
                     v-if="item.child"
                     :key="index"
                     @click.stop.prevent="handleShow(`${ownChain}${ownChain? '-' : ''}${item.k}`)"
                     class="tree-son-item"
                     :class="{'fk-active': currentChain === `${ownChain}${ownChain? '-' : ''}${item.k}`}"
            >
                {{item.v}}
                <tree-son
                        :list="item.child"
                        :sonDirection="sonDirection"
                        :chain="chain"
                        :ownChain="`${ownChain}${ownChain? '-' : ''}${item.k}`"
                        :floor="floor + 1"
                ></tree-son>
            </section>
            <section
                    class="tree-son-item"
                    @click.stop.prevent="select(item)"
                    :class="{'fk-active': chain === `${ownChain}${ownChain? '-' : ''}${item.k}`}"
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
        		// root
                root: {
                	default: false
                },
        		// 列表
        		list: {
        			type: Array,
                    require: true
                },
                // 树形链
                chain: {
        			type: String,
                    default: ''
                },
                // 自己的 chain
                ownChain: {
	                type: String,
	                default: ''
                },
                // 层级
                floor: {
        			type: Number
                },
                // 是否显示
                isShow : {
        			require: false
                },
                // 展现方向
                direction: {
                    default: false
                },
                // 子元素展现方向
                sonDirection: {
                    default: false
                }
            },
        	data () {
        		return {
                    showIndex: null,
                }
            },
            watch: {
            },
            computed: {
        		layDirection () {
        			const {direction, sonDirection} = this
        			if (direction) {
        				return direction
                    }
                    return sonDirection
                },
                currentChain () {
        			const {chain, floor} = this
        			return chain.split('-').splice(0, floor).join('-')
                },
                show () {
        			const {root, isShow, ownChain, chain, floor} = this
        			if (root) {
        				return isShow
                    }
                    return chain.split('-').splice(0, floor - 1).join('-') === ownChain
                }
            },
            methods: {
	            handleShow (cn) {
                    const {chain, currentChain, floor} = this
                    if (cn === currentChain) {
                    	cn = chain.split('-').splice(0, floor - 1).join('-')
                    }
		            this.sendFather('treeSelect', {
			            event: 'showDown',
			            playLoad: {
				           chain: cn
			            }
		            })

	            },
                select (item) {
	            	const {ownChain} = this
                    const {k, v} = item
	            	this.showIndex = null
                    this.sendFather('treeSelect', {
                    	event: 'close',
                        playLoad: {
                    		k: `${ownChain}${ownChain ? '-' : ''}${k}`,
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
                    background:#333;
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