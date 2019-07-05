<template>
  <div class="index">
    <div class="img-box">
      <img src="./index-bg.jpg" class="img-bg" alt v-show="!showVideoFlag">
      <video id="myvideo" :src="videoUrl" class="video-bg" v-show="showVideoFlag" autoplay></video>
      <router-link :to="{path:'/projectlist'}" v-show="!showVideoFlag">
        <img class="img-left" src="./img-left.png" alt>
      </router-link>
      <router-link :to="{path:'/main'}" v-show="!showVideoFlag">
        <img class="img-right" src="./img-right.png" alt>
      </router-link>
      <div class="vr-btn" @click="onShowVideo" v-show="!showVideoFlag">
        <img src="./video-btn.png" alt>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showVideoFlag: false,
      videoUrl: ""
    };
  },
  created() {
    let _this = this;
    window.onkeydown = function() {
      _this.onHideVideo();
    };
    let params = new FormData();
    this.$http.post(process.env.API_HOST + "getvideo", params).then(res => {
      // console.log(res.data);
      if (res.data.status == 1) {
        this.videoUrl = res.data.video_url;
      }
    });
  },
  mounted() {},
  methods: {
    onShowVideo: function() {
      this.showVideoFlag = true;
      let target = document.getElementById("myvideo");
      target.play();
    },
    onHideVideo: function() {
      this.showVideoFlag = false;
    }
  }
};
</script>

<style lang="less" scoped>
.index {
  background: #196e5f;
  // width: 38.4rem;
  // height: 21.6rem;
  // overflow: hidden;
  width: 100%;
  height: 100%;
  .img-box {
    width: 100%;
    height: auto;
    position: relative;
    .img-bg {
      width: 100%;
    }
    .video-bg {
      width: 100%;
      height: 100%;
      object-fit: fill;
    }
    .img-left {
      position: absolute;
      width: 8.31rem;
      height: 4.46rem;
      top: 13.82rem;
      left: 8.87rem;
      z-index: 10;
      cursor: pointer;
    }
    .img-right {
      position: absolute;
      width: 8.31rem;
      height: 4.46rem;
      top: 13.82rem;
      right: 8.87rem;
      z-index: 10;
      cursor: pointer;
    }
    .vr-btn {
      width: 1.5rem;
      position: absolute;
      top: 19.5rem;
      right: 1.5rem;
      z-index: 20;
      img {
        width: 1.5rem;
        cursor: pointer;
      }
    }
  }
}
</style>
