<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="goStart">返回首页</button>

    <div style="border: 1px solid black;">
      <span>待审查</span>
      <li v-for="task in tasks" v-if="task.name==='项目负责人审查'">
        <router-link :to="'/record-process/project-leader-check/task/'+task.id"> 任务id{{task.id}}
        </router-link>
      </li>
    </div>

    <div style="border: 1px solid black;">
      <span>待确认</span>
      <li v-for="task in tasks" v-if="task.name==='项目负责人确认'">
        <router-link :to="'/record-process/project-leader-confirm/task/'+task.id"> 任务id{{task.id}}
        </router-link>
      </li>
    </div>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';

  export default {
    name: 'ProjectLeaderIndex',
    data() {
      return {
        msg: '项目管理员主页',
        principal: localStorage.getItem('principal'),
        tasks: []
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
            candidateUser: this.principal
          },
          url: 'http://localhost:8081/query/tasks'
        }).then(function (response) {
          parent.tasks = response.data.data;
        });
      },
      goStart: function (event) {
        this.$router.push('/');
      }
    }
  }
</script>
