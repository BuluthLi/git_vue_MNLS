<template>
  <div class="app" ref="app">
    <!-- <div id="fullscreen" @click="fullScreen"></div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  created() {},
  mounted() {
    // console.log(this.$refs.app);
    let target = document.documentElement || document.body;
    // console.log("输出当前的视口宽高", target.clientWidth, target.clientHeight);
    this.$refs.app.style.width = target.clientWidth + "px";
    this.$refs.app.style.height = target.clientHeight + "px";
  },
  methods: {}
};
</script>

<style>
html,
body {
  width: 100%;
  margin: 0;
  padding: 0;
}
::-webkit-scrollbar {
  width: 0;
  color: transparent;
  display: none;
}
.app {
  font-family: "Microsoft Yahei";
  min-width: 1280px;
  color: black;
  overflow: hidden;
}
/* 改变iview的page组件默认样式 */
.ivu-page.mypage {
  height: 1rem;
  text-align: center;
  font-size: 0.48rem;
}
.ivu-page-next,
.ivu-page-prev {
  width: 1rem;
  height: 1rem;
  line-height: 0.8rem;
}
.ivu-icon {
  font-size: 0.48rem;
}
.ivu-page-item {
  min-width: 1rem;
  height: 1rem;
  line-height: 0.9rem;
  margin-right: 0.1rem;
  background-color: #fff;
  border: 0.03rem solid #dcdee2;
  border-radius: 0.12rem;
}
.ivu-page-item-active {
  background: #2d8cf0;
}
.ivu-page-item-active a,
.ivu-page-item-active:hover a {
  color: white;
}
</style>
