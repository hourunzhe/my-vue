<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <form name='form1'>
      <div v-for="formProperty in formProperties">
        <label>{{ formProperty.value }}</label>
        <input v-model="formData[formProperty.name]">{{formData[formProperty.name]}}
      </div>
    </form>
    <button v-on:click="confirm">提交</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */

  import axios from 'axios';

  export default {
    name: 'Task',
    data() {
      return {
        msg: '流程TASK页面',
        formProperties: [],
        task: null,
        processInstanceId: this.$router.currentRoute.params.id,
        formData: {}
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        this.formData = {};
        const parent = this;
        axios({
          method: 'get',
          url: 'http://localhost:8081/form-step/' + this.processInstanceId + '/task'
        }).then(function (response) {
          parent.task = response.data;
          if (parent.task !== '') {
            axios({
              method: 'get',
              url: 'http://localhost:8081/form/form-data?taskId=' + parent.task.id
            }).then(function (response) {
              parent.formProperties = response.data.formProperties;
            });
          }
        });
      },
      confirm: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: this.formData,
          url: 'http://localhost:8081/form-step/' + this.processInstanceId + '/task/' + this.task.id + '/complete'
        }).then(function (response) {
          console.log(response);
          if (response.data !== '') {
            parent.init();
          } else {
            parent.$router.push('/finish');
          }
        });
      }
    }
  }
</script>
