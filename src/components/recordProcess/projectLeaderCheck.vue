<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="border: 1px solid black">
      <span>record详情</span><br/>
      name: {{record.name}}<br/>
      description {{record.description}}
    </div>
    <div>
      <label>是否同意</label>
      <input type="checkbox" v-model="projectLeaderCheckResult"/> {{projectLeaderCheckResult}}
      <button v-on:click="complete">提交</button>
    </div>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';

  export default {
    name: 'ProjectLeaderCheck',
    data() {
      return {
        msg: '项目管理员审查',
        record: {},
        recordId: null,
        taskId: this.$router.currentRoute.params.taskId,
        task: {},
        projectLeaderCheckResult: false
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
          method: 'post',
          data: {
            action: 'complete',
            variables: [{
              name: 'projectLeaderCheckResult',
              value: this.projectLeaderCheckResult,
              type: 'boolean'
            }]
          },
          url: 'http://localhost:8081/runtime/tasks/' + parent.taskId
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/');
        });
      }
    }
  }
</script>
