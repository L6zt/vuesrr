<template>
    <div class="jc-pagination">
        <a class="pd-left" @click="handlePre($event)" :class="{disabled: value === 1}">
            上一页
        </a>
        <a v-for="item, index in list"
           @click="handleSelect($event,item)"
           :key="index"
           :class="{active: item === value, 'normal-pq': true}"
           :href="typeof item === 'number' ? `son/${value}` : `javascript:void(0)`">
            {{item}}
        </a>
        <a class="pd-right" @click="handleNext" :class="{disabled: value === allPage}">
            下一页
        </a>
    </div>
</template>
<script>
	export default {
		props: {
			value: {
				type: Number,
				require: false,
				default: 1
			},
			allPage: {
				type: Number,
				default: 100
			},
			showPq: {
				type: Number,
				require: false,
				default: 5
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
			}
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
					for (let i = 1; i <= showPq; i++) {
						list.push(i)
					}
					this.list = list
					return
				}
				if (currentIndex + showPq <= allPage) {
					list.push(1, '...')
					for (let i = currentIndex - 2; i < currentIndex + 3; i++) {
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
			}
		},
		created () {
			this.handlePq()
		}
	}
</script>
<style>
    .jc-pagination {
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
         &.active {
          color: #ce2f2f;
        }
      }
    }
</style>
