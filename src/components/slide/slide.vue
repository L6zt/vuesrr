<template>
    <div class="jc-slide-comp" :style="{width: `${width}`}">
        <div class="jc-slide-container" :style="{width: `${width}`}">
            <i class="slide-btn"></i>
            <section class="slide-line"></section>
        </div>
    </div>
</template>
<script>
    export default {
        props: {
        	width: {
        		type: String,
                default: '200px'
            }
        },
        methods: {

        }
    }
</script>
<style>
    @component-namespace jc {
        @component slide-comp {
            position: relative;
            .jc-slide-container {
                position: relative;
                height: 30px;
                padding: 12px 0;
                box-sizing: border-box;
                display: inline-block;
               .slide-btn {
                position: absolute;
                display: block;
                left: 0;
                top: 0;
                bottom: 0;
                margin: auto;
                width: 20px;
                height: 20px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 0 3px #333;
                z-index: 999;
                cursor: pointer;
            }
               .slide-line {
                position: relative;
                height: 100%;
                width: 100%;
                background: #ccc;
                border-radius: 5px;
            }
            }
        }
    }
</style>