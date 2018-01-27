<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>
      <label>名称</label>
      <input v-model="record.name"/> {{record.description}}
    </div>
    <div>
      <label>描述</label>
      <input v-model="record.description"/> {{record.description}}
    </div>
    <button v-on:click="complete">提交</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';

  export default {
    name: 'InputRecordInfo',
    data() {
      return {
        msg: '填写备案信息',
        principal: localStorage.getItem('principal'),
        record: {
          name: '',
          description: ''
        },
        processInstanceId: this.$router.currentRoute.params.processInstanceId,
        task: {},
        user: {}
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        const parent = this;
        axios({
          method: 'post',
          data: {
            processInstanceId: this.processInstanceId
          },
          url: 'http://localhost:8081/query/tasks'
        }).then(function (response) {
          parent.task = response.data.data[0];
        });
        axios({
          method: 'get',
          url: 'http://localhost:8081/identity/users/' + this.principal
        }).then(function (response) {
          parent.user = response.data;
        });
      },
      complete: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: this.record,
          url: 'http://localhost:8081/records'
        }).then(function (response) {
          axios({
            method: 'post',
            data: {
              action: 'complete',
              variables: [{
                name: 'recordId',
                value: response.data.id,
                type: 'long'
              }, {
                name: 'to',
                value: parent.user.email,
                type: 'string'
              }, {
                name: 'masterResult',
                value: false,
                type: 'boolean'
              }, {
                name: 'projectLeaderCheckResult',
                value: false,
                type: 'boolean'
              }, {
                name: 'projectLeaderConfirmResult',
                value: false,
                type: 'boolean'
              }, {
                name: 'departmentLeaderConfirmResult',
                value: false,
                type: 'boolean'
              }, {
                name: 'paperResult',
                value: false,
                type: 'boolean'
              }
              ]
            },
            url: 'http://localhost:8081/runtime/tasks/' + parent.task.id
          }).then(function (response) {
            console.log(response);
            parent.$router.push('/');
          });
        });
      }
    }
  }
</script>
