<template>
  <div class="imgpreview" v-show="flag">
    <div class="shade" @click="onHideImg"></div>
    <div
      class="img-box"
      :style="{backgroundImage:'url('+url+')',width:width,height:height}"
      @click="onHideImg"
      v-show="getWidthOk"
    >
      <!-- <img :src="url" alt /> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { setInterval } from "timers";
var s = null;
export default {
  data() {
    return {
      width: "27rem",
      height: "18rem",
      getWidthOk: false
    };
  },
  props: {
    url: {
      type: String,
      default: ""
    },
    flag: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    url: function(newValue, oldValue) {
      // console.log("new:" + newValue + ",old:" + oldValue);
      if (newValue != "") {
        // console.log("执行");
        this.getWidth(newValue);
      }
    }
  },
  // mounted() {
  //   console.log("加载");
  // },
  // beforeDestroy() {
  //   console.log("销毁");
  // },
  methods: {
    onHideImg: function() {
      if (s) {
        window.clearInterval(s);
      }
      this.$emit("onHideImg", false);
    },
    getWidth: function(url) {
      let _this = this;
      let str = "";
      let start_time = new Date().getTime();
      let img = new Image();
      img.src = url;
      s = window.setInterval(() => {
        // 只要任何一方大于0
        // 表示已经服务器已经返回宽高
        if (img.width > 0 || img.height > 0) {
          // console.log(img.width, img.height);
          //如果宽高同时小于区域
          if (img.width < 1350 && img.height < 900) {
            // console.log("小于");
            _this.width = parseInt((img.width * 2) / 100) + "rem";
            _this.height = parseInt((img.height * 2) / 100) + "rem";
          } else {
            _this.width = "27rem";
            _this.height = "18rem";
          }
          _this.getWidthOk = true;
          // console.log(
          //   11111111111,
          //   _this.timer,
          //   _this.timer.clearInterval,
          //   _this.timer._clearFn,
          //   _this.timer._id
          // );
          window.clearInterval(s); //关闭
        }
      }, 40);
    }
  }
};
</script>

<style lang="less" scoped>
.imgpreview {
  position: fixed;
  z-index: 997;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
  justify-content: center;
  .shade {
    position: absolute;
    z-index: 998;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }
  .img-box {
    position: absolute;
    z-index: 999;
    top: 50%;
    left: 50%;
    // width: 27rem;
    // height: 18rem;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    // img {
    //   width: 18rem;
    // }
  }
}
</style>
