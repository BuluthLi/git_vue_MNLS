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
  /** 用户操作行为监测,这里使用路由检测来实现，projectList页面使用执行单个函数来实现
   * destroy钩子要手动调用$destrory()方法才会被触发：this.$destory();触发beforeDestory和destoryed两个生命周期hook
   */
  // watch: {
  //   $route(to, from) {
  //     console.log(to);
  //     console.log(from);
  //     if (true) {
  //       // 需要处理的业务逻辑
  //       console.log(1234533);
  //     }
  //   }
  // },
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
  /* min-width: 1280px; */
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
/* 渐进式图片默认样式修改 */
/* 图片模式 */
.progressive-image-wrapper {
  overflow: hidden;
  display: flex;
  align-items: center;
}
.progressive-image-placeholder,
.progressive-image-main {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}
/* 背景图片模式 */
.saledetail .left .progressive-background-image,
.saledetail .left .progressive-background-placeholder,
.projectdetail .left .progressive-background-image,
.projectdetail .left .progressive-background-placeholder {
  background-size: contain;
}
</style>
