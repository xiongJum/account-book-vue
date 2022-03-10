<template>
<nav class="navbar navbar-light bg-light">
  <form class="container-fluid justify-content-start">
    <button class="btn btn-sm btn-outline-success me-3" type="button" @click="jump($event, 'start')">开始记账</button>
    <button class="btn btn-sm btn-outline-secondary me-2" type="button" @click="jump($event, 'book')">查看账本</button>
    <button class="btn btn-sm btn-outline-secondary" type="button" @click="jump($event, 'config')">系统配置</button>
    <!-- <button class="btn btn-sm btn-outline-secondary" type="button">查看账本</button> -->
  </form>
</nav>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { router } from './router';

export default {
  name: "App",
  components: {
    HelloWorld,
  },
  setup () {
    // 跳转页面
    function jump ($event, link_name) {
      switch (link_name) {
        case 'book':
          router.push({ name: "Book" });
          break;
        case 'config':
          router.push({ name: "Config" })
          break;
        case 'start':
          router.push({name: 'AddBook'})
          break;
      }
    }
    return {
      jump
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
