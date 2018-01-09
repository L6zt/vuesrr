<template>
  <section class="jc-section-container">
     <h3 class="jc-section-container__title">
       <slot></slot>
     </h3>
     <div class="jc-section-container__content">
       <slot name="content"></slot>
     </div>
  </section>
</template>
<script>
  export default {
    data () {
      return {
        
      }
    }
  }
</script>
<style>
    /*@component-namespace jc {*/
        /*@component section-container {*/
            /*@e title{*/
                /*font-size: 18px;*/
                /*padding-left: 5px;*/
                /*height: 25px;*/
                /*line-height: 25px;*/
                /*border-bottom: 1px solid #ccc;*/
            /*}*/
            /*@e content {*/
                /*padding: 5px;*/
            /*}*/
        /*}*/
    /*}*/
    .jc-section-container {
        .jc-section-container__title {
            font-size: 16px;
            font-weight: normal;
            padding: 5px;
            height: 25px;
            line-height: 25px;
            border-bottom: 1px solid #ccc;
        }
        .jc-section-container__content {
            margin-top: 10px;
        }
    }
</style>
