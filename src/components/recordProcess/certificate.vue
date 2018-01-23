<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="border: 1px solid black">
      <span>record详情</span><br/>
      name: {{record.name}}<br/>
      description {{record.description}}
    </div>
    <button v-on:click="complete">发证</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';

  export default {
    name: 'Certificate',
    data() {
      return {
        msg: '发证',
        record: {},
        recordId: null,
        taskId: this.$router.currentRoute.params.taskId,
        task: {},
        paperResult: false
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        const parent = this;
        axios({
          method: 'get',
          url: 'http://localhost:8081/runtime/tasks/' + this.taskId + '/variables/recordId'
        }).then(function (response) {
          parent.recordId = response.data.value;
          axios({
            method: 'get',
            url: 'http://localhost:8081/records/' + response.data.value
          }).then(function (response) {
            parent.record = response.data;
          });
        });
      },
      complete: function (event) {
        const parent = this;
        axios({
          method: 'put',
          url: 'http://localhost:8081/records/' + this.recordId + '/pass'
        }).then(function (response) {
          console.log(response);
        });
        axios({
          method: 'post',
          data: {
            action: 'complete'
          },
          url: 'http://localhost:8081/runtime/tasks/' + this.taskId
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/');
        });
      }
    }
  }
</script>
