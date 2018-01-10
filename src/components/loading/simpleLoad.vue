<template>
    <div class="jc-simpleload-container">
      <span class="ld-circle"></span>
      <span class="ld-circle"></span>
      <span class="ld-circle"></span>
    </div>
</template>
<style>
    :root {
        --left-loaction: 20px;
        --am-time: 100ms
    }
    @component-namespace jc-simpleload {
        @component container {
            position: relative;
            display: inline-block;
            width: 100px;
            height: 100px;
            span {
                position: absolute;
                top: 0;
                bottom: 0;
                margin: auto;
                display: block;
                width: 10px;
                height: 10px;
                border-radius: 50%;
                background: red;
            }
            @for $i from 1 through 3 {
                span:nth-of-type($i) {
                    left: calc(var(--left-loaction) * $i);
                    animation: scale 500ms infinite alternate;
                    animation-delay: calc($i * var(--am-time));
                }
            }
        }
    }
    @keyframes scale {
        from {transform: scale(0.5, 0.5);}
         to {transform: scale(1, 1);}
    }
</style>