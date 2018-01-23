<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button v-on:click="goStart">返回首页</button>
    <div style="border: 1px solid black;">
      <span>待初审</span>
      <li v-for="task in tasks" v-if="task.name==='主办初审'">
        <router-link :to="'/record-process/first-check/task/'+task.id"> 任务id{{task.id}}
        </router-link>
      </li>
    </div>

    <div style="border: 1px solid black;">
      <span>纸质材料审查</span>
      <li v-for="task in tasks" v-if="task.name==='纸质材料审查'">
        <router-link :to="'/record-process/paper-check/task/'+task.id"> 任务id{{task.id}}
        </router-link>
      </li>
    </div>
    <div style="border: 1px solid black;">
      <span>发证</span>
      <li v-for="task in tasks" v-if="task.name==='发证'">
        <router-link :to="'/record-process/certificate/task/'+task.id"> 任务id{{task.id}}
        </router-link>
      </li>
    </div>

    <div>
      <form method="post" action="http://localhost:8081/repository/deployments" enctype="multipart/form-data">
        <input type="file" name="file">
        <button type="submit">上传</button>
      </form>
    </div>
  </div>
</template>

<script>
  /* eslint-disable semi,padded-blocks,space-before-function-paren */
  import axios from 'axios';

  export default {
    name: 'MasterIndex',
    data() {
      return {
        msg: '主办主页',
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
