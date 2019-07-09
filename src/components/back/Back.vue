<template>
  <div class="back" @click="onBack">
    <img src="./back.png" alt />
    <span>返回</span>
  </div>
</template>

<script>
import { sendMessage } from "../../common/js/util";
export default {
  data() {
    return {};
  },
  methods: {
    onBack: function() {
      //导入场景，与软件交互
      let app = document.documentElement || document.body;
      let data = "width=" + app.clientWidth + "&height=" + app.clientHeight;
      // console.log(data);
      //点击返回了，先改变为芯片状态
      this.$emit("changestatus");
      sendMessage(1);
      this.sendMessageH("CB_SP_BACKWARD", data);
      if (window.history.length == 0) {
        this.$router.push({ path: "/main/salelist" });
      } else {
        // this.$router.back(1);
        let currentPage = this.$router.history.current.name;
        // console.log(currentPage);
        switch (currentPage) {
          case "Main":
            this.$router.push({ path: "/" });
            break;
          case "ProjectList":
            this.$router.push({ path: "/" });
            break;
          case "ProjectDetail":
            this.$router.push({ path: "/projectlist" });
            break;
          case "SaleList":
            this.$router.push({ path: "/main" });
            break;
          case "SaleDetail":
            // this.$router.push({
            //   path: "/main/salelist",
            //   query: { id: 3 }
            // });
            this.$router.back(1);
            break;
          default:
            this.$router.push({ path: "/" });
            break;
        }
      }
    },
    sendMessageH: function(func, str) {
      window.cefQuery({
        request: func + "|" + str,
        onSuccess: function(response) {},
        onFailure: function(error_code, error_message) {}
      });
    }
  }
};
</script>
<style lang="less" scoped>
.back {
  position: fixed;
  z-index: 99;
  top: 1.32rem;
  right: 0.7rem;
  font-size: 0.6rem;
  align-items: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  img {
    width: 0.5rem;
    height: 0.5rem;
    vertical-align: middle;
  }
  span {
    display: inline-block;
    vertical-align: middle;
    color: #00561f;
  }
}
</style>



