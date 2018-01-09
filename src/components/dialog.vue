<template>
    <div class="jc-dialog-box">
        <transition name="fade">
            <div class="jc-dialog-warp" v-show="value">
                <section class="jc-dialog-slot" v-clickOut="close">
                    <i class="jc-dialog-close" @click="close"></i>
                    <dl>
                        <dt class="jc-dialog-slot-title">
                           {{tt}}
                        </dt>
                        <dd class="jc-dialog-slot-ct">
                            <slot name="ct"></slot>
                        </dd>
                    </dl>
                </section>
            </div>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
        	value: {
        		type: Boolean,
                default: false
            },
            tt: {
        		type: String,
                default: false
            }
        },
        methods: {
        	close () {
        		this.value && this.$emit('input', false)
            }
        }
    }
</script>
<style>
    @component-namespace jc {
        @component dialog {
            @descendent box {
              .fade-enter-active {
                  opacity: 1;
                  transition: all .5s ease;
              }
              .fade-enter, .fade-leave {
                  opacity: 0;
              }
            }
            @descendent warp {
                 position: fixed;
                 left: 0;
                 top: 0;
                 width: 100%;
                 height: 100%;
                 background: rgba(0, 0,0, .5);
                z-index: 9999;
             }
            @descendent slot {
                position: absolute;
                width: 600px;
                height: 300px;
                background: #fff;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                overflow: auto;
               @descendent title {
                   padding: 5px 26px;
                   text-align: center;
                   font-size: 14px;
                   border-bottom: 1px solid #ccc;
               }
                @descendent ct {
                    padding: 10px;
                }
            }
            @descendent close{
                position: absolute;
                top: 4.5px;
                right: 4.5px;
                width: 20px;
                height: 20px;
                background: url(../assert/img/icon/close-icon.png) 0 0 / cover no-repeat;
                cursor: pointer;
            }
       }
    }
</style>