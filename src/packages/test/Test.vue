<template>
    <div class="fuck">
        {{text}}
        <slot></slot>
    </div>
</template>
<script>
    export default {
    	name: 'jcText',
    	props: {
    		text: String
        }
    }
</script>
<style src="../style/test.css"></style>