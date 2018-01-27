<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div style="border: 1px solid black">
      <span>record详情</span><br/>
      name: {{record.name}}<br/>
      description {{record.description}}
    </div>
    <div v-for="formProperty in formProperties">
      <label>{{formProperty.name}}</label>
      <input type="checkbox" v-model="formProperty.value" v-if="formProperty.type==='boolean'"/>
      <input type="text" v-model="formProperty.value" v-if="formProperty.type==='string'"/>
      <input type="number" v-model="formProperty.value" v-if="formProperty.type==='long'"/>
      {{formProperty.value}}
    </div>
    <button v-on:click="complete">提交</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren,spaced-comment */
  import axios from 'axios';

  export default {
    name: 'Check',
    data() {
      return {
        msg: '',
        principal: localStorage.getItem('principal'),
        record: {},
        recordId: null,
        taskId: this.$router.currentRoute.params.taskId,
        formProperties: []
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
        axios({
          method: 'get',
          url: 'http://localhost:8081/form/form-data?taskId=' + this.taskId
        }).then(function (response) {
          parent.formProperties = response.data.formProperties;
          for (let i = 0; i < parent.formProperties.length; i++) {
            if (parent.formProperties[i].type === 'boolean') {
              parent.formProperties[i].value = parent.formProperties[i].value === 'true';
            }
          }
        });
        axios({
          method: 'get',
          url: 'http://localhost:8081/runtime/tasks/' + this.taskId
        }).then(function (response) {
          parent.msg = response.data.name;
        });
      },
      complete: function (event) {
        const parent = this;
        /* if (!this.masterResult) {
           axios({
             method: 'put',
             url: 'http://localhost:8081/records/' + this.recordId + '/reject'
           }).then(function (response) {
             console.log(response)
           });
         }*/
        const variables = [];
        for (let i = 0; i < this.formProperties.length; i++) {
          variables.push({
            name: this.formProperties[i].id,
            value: this.formProperties[i].value,
            type: this.formProperties[i].type
          })
        }
        axios({
          method: 'post',
          data: {
            action: 'complete',
            variables: variables
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
