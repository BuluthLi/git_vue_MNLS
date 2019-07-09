<template>
  <div class="main">
    <div class="title" @click="onChangeLanguage">{{$t("message.title")}}</div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index" class="item" @click="onIntoList(item.id)">
          <img :src="item.img_url" alt class="item-cover" />
          <div class="item-name">
            <div class="shade"></div>
            <div class="text">{{$t("message."+item.id)}}</div>
          </div>
        </li>
      </ul>
    </div>
    <Back v-on:changestatus="reChangeStatus(1)"></Back>
  </div>
</template>
<script>
import imgcoverpng from "./img-cover.png";
import Back from "@/components/back/Back.vue";
export default {
  data() {
    return {
      list: []
    };
  },
  created() {},
  mounted() {
    let language = this.$store.getters["user/value"];
    this.$i18n.locale = language;
    let params = new FormData();
    this.$http.post(process.env.API_HOST + "retail", params).then(res => {
      // console.log(res.data);
      if (res.data.status == 1) {
        if (res.data.length == 0) return;
        this.list = res.data.data;
      }
    });
  },
  methods: {
    onIntoList: function(id) {
      this.$router.push({
        path: "/main/salelist",
        query: { id: id }
      });
    },
    reChangeStatus: function() {},
    onChangeLanguage: function() {
      // let _this=this;
      this.$store.dispatch("user/acChangeLanguage", () => {
        let language = this.$store.getters["user/value"];
        this.$i18n.locale = language;
      });
    }
  },
  components: {
    Back
  }
};
</script>

<style lang="less" scoped>
.main {
  .title {
    font-size: 1.44rem;
    font-weight: bold;
    text-align: center;
    margin: 0.9rem 0 0.2rem 0;
  }
  .content {
    ul {
      margin: 0 2rem;
      .item {
        display: inline-block;
        list-style: none;
        width: 6.8rem;
        height: 5rem;
        margin: 0.8rem 0.85rem 0 0.85rem;
        overflow: hidden;
        position: relative;
        .item-cover {
          width: 6.8rem;
          height: 5rem;
          position: absolute;
          z-index: 20;
          top: 0;
          left: 0;
        }
        .item-name {
          display: block;
          width: 100%;
          height: 100%;

          font-size: 0.78rem;
          color: white;
          font-weight: bold;
          position: absolute;
          z-index: 21;
          top: 0;
          left: 0;
          .shade {
            width: 100%;
            height: 100%;
            position: absolute;
            z-index: 22;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.22);
          }
          .text {
            color: white;
            position: absolute;
            z-index: 23;
            width: 100%;
            text-align: center;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .item:hover {
        .item-cover {
          transform: scale(1.1);
          transition: transform 0.3s ease;
        }

        // .item-name {
        //   display: block;
        // }
      }
    }
  }
}
</style>
