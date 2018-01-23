<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="goStart">回到最初</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */

  export default {
    name: 'Finish',
    data() {
      return {
        msg: '流程结束'
      }
    },
    methods: {
      goStart: function (event) {
        this.$router.push('/');
      }
    }
  }
</script>
