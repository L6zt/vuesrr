<template>
    <div class="jc-pagination">
        <a class="pd-left" @click="handlePre($event)"
        :class="{disabled: value === 1}"
        v-if="allPage"
        >
            上一页
        </a>
        <a v-for="item, index in list"
           v-if="allPage"
           @click="handleSelect($event,item)"
           :key="index"
           :class="{'is-active': item === value, 'normal-pq': true}"
           :href="typeof item === 'number' ? `${ssrHrefReplace(item)}` : `javascript:void(0)`"
        >
          {{item}}
        </a>
        <a class="pd-right"
           v-if="allPage"
           @click="handleNext"
           :class="{disabled: value === allPage}"
        >
            下一页
        </a>
    </div>
</template>
<script>
    /*
        ********  ********
          ssrHref ::: 'gist/:num/pageIndex=1&pageSize=10'
        *******   ********
    */
	export default {
		props: {
			value: {
				type: Number,
				require: false
			},
			allPage: {
				type: [Number, String],
				default: 100
			},
			showPq: {
				type: Number,
				require: false,
				default: 5
			},
            ssrHref: {
				type: String,
                default: ''
            }
		},
		data () {
			return {
				list: []
			}
		},
		watch: {
			value () {
				this.handlePq()
			},
			allPage (v) {
				if (this.value > v) {
					console.log(this.value)
					this.$emit('input', 1)
                    return
                }
				this.handlePq()
            },
		},
		methods: {
			/**
			 * 1...showPq...allPage
			 * 1... value .. showPq -> 2
			 * showPq... value ... allPage ->2
			 */
			handlePq () {
				let {showPq, value: currentIndex, allPage} = this
				let list = []
				if (currentIndex < showPq) {
					if (showPq < allPage) {
						for (let i = 1; i <= showPq; i++) {
							list.push(i)
						}
						list.push('...')
						list.push(allPage)
						this.list = list
						return
					}
					for (let i = 1; i <= allPage; i++) {
						list.push(i)
					}
					this.list = list
					return
				}
				if (currentIndex + showPq <= allPage) {
					list.push(1, '...')
					for (let i = currentIndex - 2; i < currentIndex +  3; i++) {
						list.push(i)
					}
					list.push('...', allPage)
					this.list = list
					return
				} else {
					list.push(1, '...')
					for (let i = allPage - showPq > 1 ? allPage - showPq : 2; i <= allPage; i++) {
						list.push(i)
					}
					this.list = list
					return
  				}
			},
			handleSelect (e, item) {
				e.preventDefault()
				if (typeof item === 'number') {
					this.$emit('input', item)
				}
			},
			handlePre (e) {
				e.preventDefault()
				let {value} = this
				value !== 1 && this.$emit('input', value - 1)
			},
			handleNext (e) {
				e.preventDefault()
				let {allPage, value} = this
				allPage !== value && this.$emit('input', value + 1)
			},
            ssrHrefReplace (num) {
				const {ssrHref} = this
				if (ssrHref) {
					return ssrHref.replace(/:num/i, num)
                }
				return ''
            }
		},
		created () {
			this.handlePq()
		}
	}
</script>
<style>

  @component-namespace jc {
    @component pagination {
      @utils-clearfix;
      a{
          font-size: 12px;
          cursor: pointer;
          text-decoration: none;
          text-align: center;
          min-width: 30px;
          height: 20px;
          line-height: 20px;
          margin-left: 5px;
          border: 1px solid #ccc;
          border-radius: 5px;
          color: #333;
        }
        .pd-left, .pd-right {
          float: left;
          &.disabled {
            cursor: not-allowed;
            color: #ccc;
          }
      }
      .normal-pq {
          float: left;
          @when active {
               background: #49a9ee;
               color: #fff;
          }
         @element elem {

         }
      }
    }
  }
</style>
