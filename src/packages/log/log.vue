<template>
    <transition name="fade">
        <div class="jc-log-container"
             :class="{'is-success': type === 'success', 'is-warn': type === 'warn'}"
             v-show="show"
        >
            {{content}}
        </div>
    </transition>
</template>
<script>
    export  default {
        props: {
    		type : {
    			type: String
            },
            content: {
    			type: String
            },
            show: {
    			type: Boolean,
                default: false
            }
        },
        mounted () {
    		console.log('mounted', this.type)
        }
    }
</script>
<style>
    @component-namespace jc {
        @component log {
            @descendent container {
                position: fixed;
                left: 0;
                right: 0;
                margin: auto;
                top: 20px;
                width: 300px;
                padding: 5px;
                letter-spacing: 3px;
                text-align: center;
                background: #fff;
                font-size: 14px;
                z-index: 999;
                box-shadow: 0 0 3px #ccc;
                cursor: pointer;
                @when success {
                    color: #69ce37;
                }
                @when warn {
                    color: #f56c6c;
                }

                &.fade-enter-active, &.fade-leave-active {
                   transition: all 500ms ease;
                 }
                &.fade-enter, &.fade-leave-to {
                  opacity: 0;
                   transform: translate(0, -20px);
               }
            }
        }
    }
</style>