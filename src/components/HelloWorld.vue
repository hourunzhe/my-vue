<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="loginUser">普通用户登录</button>
    <button v-on:click="loginMaster">主办登录</button>
    <button v-on:click="loginProjectLeader">项目管理员登录</button>
    <button v-on:click="loginDepartmentLeader">部门管理员登录登录</button>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */

  import axios from 'axios';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        msg: 'ACTIVITI实现流程'
      }
    },
    methods: {
      loginUser: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: 'username=user&password=user',
          url: 'http://localhost:8081/authentication'
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/user/index');
          parent.storageAuthentication(response.data);
        });
      },
      loginMaster: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: 'username=master&password=master',
          url: 'http://localhost:8081/authentication'
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/master/index');
          parent.storageAuthentication(response.data);
        });
      },
      loginProjectLeader: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: 'username=projectLeader&password=projectLeader',
          url: 'http://localhost:8081/authentication'
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/project-leader/index');
          parent.storageAuthentication(response.data);
        });
      },
      loginDepartmentLeader: function (event) {
        const parent = this;
        axios({
          method: 'post',
          data: 'username=departmentLeader&password=departmentLeader',
          url: 'http://localhost:8081/authentication'
        }).then(function (response) {
          console.log(response);
          parent.$router.push('/department-leader/index');
          parent.storageAuthentication(response.data);
        });
      },
      storageAuthentication: function (authentication) {
        localStorage.setItem('principal', authentication.principal);
      }
    }
  }
</script>
