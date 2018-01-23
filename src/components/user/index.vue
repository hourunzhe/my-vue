<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="border: 1px solid black;">
      <span>record列表</span>
      <li v-for="record in records">
        name: {{record.name}}======={{record.recordState}}
      </li>
    </div>
    <button v-on:click="goStart">返回首页</button>
    <button v-on:click="start">注册备案</button>
  </div>
</template>
<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';
  export default {
    name: 'UserIndex',
    data() {
      return {
        msg: '普通用户主页',
        records: []
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init: function () {
        axios({
          method: 'get',
          url: 'http://localhost:8081/records'
        }).then(function (response) {
          parent.records = response.data;
        });
        const parent = this;
      },
      start: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: {
            processDefinitionKey: 'recordProcess'
          },
          url: 'http://localhost:8081/runtime/process-instances'
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/record-process/' + response.data.id + '/input-record-info');
        });
      },
      goStart: function (event) {
        this.$router.push('/');
      }
    }
  }
</script>
