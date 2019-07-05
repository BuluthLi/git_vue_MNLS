<template>
  <div class="imgpreview" v-show="flag">
    <div class="shade" @click="onHideImg"></div>
    <div class="img-box">
      <img :src="url" alt>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return {};
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
  mounted() {},
  methods: {
    onHideImg: function() {
      this.$emit("onHideImg", false);
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
    width: 18rem;
    height: auto;
    transform: translate(-50%, -50%);
    img {
      width: 18rem;
    }
  }
}
</style>
