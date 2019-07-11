<template>
  <div class="main">
    <!-- <div class="title" @click="onChangeLanguage">{{$t("message.title")}}</div> -->
    <div class="title">常规零售选材区</div>
    <div class="content">
      <ul>
        <li v-for="(item,index) in list" :key="index" class="item" @click="onIntoList(item.id)">
          <img :src="item.img_url" alt class="item-cover" />
          <div class="item-name">
            <div class="shade"></div>
            <!-- <div class="text">{{$t("message."+item.id)}}</div> -->
            <div class="text">{{item.cname}}</div>
          </div>
        </li>
      </ul>
    </div>
    <Back v-on:changestatus="reChangeStatus(1)"></Back>
    <Xu></Xu>
  </div>
</template>
<script>
import imgcoverpng from "./img-cover.png";
import Back from "@/components/back/Back.vue";
var Xu;
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    // let language = this.$store.getters["user/value"];
    // this.$i18n.locale = language;
  },
  mounted() {
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
      //动态引入hai.css(测试成功)
      // var cssA = import("./hai.css").then(a => {
      //   console.log(a);
      // });
      //能执行，会有报错，不影响流程
      // var cssHai = () => import("./hai.css");
      // console.log(cssHai);
      // import(cssHai());
      // console.log(this.$store.getters['user/value']);
      // -----------------------------------------------------------------------------------
      // 动态引入import测试,
      // 测试失败，组件一般只存在：
      // 1.按需加载：router配置的模式，
      // 2.组件懒加载：vue-lazy-loader或者新官网lazy模式，
      // 3.条件加载：用flag控制或者v-if控制组件的加载或者卸载，
      // 总共三种大的情况,
      // 以下这种的动态导入可以归结到第三种，所以下面两行代码无意义，
      // 但是注意上方的css条件加载是成功的，有效且十分有意义（只考虑css换肤，即可以切换css文件，不考虑删除css文件）
      // （无意义代码：第三种情况）var Xu = () => import("./xu.vue");
      // （无意义代码：第三种情况）console.log(Xu());
      this.$store.dispatch("user/acChangeSaleId", id);
      // this.$router.push({
      //   path: "/main/salelist",
      //   query: { id: id }
      // });
    },
    reChangeStatus: function() {},
    onChangeLanguage: function() {
      // let _this=this;
      // this.$store.dispatch("user/acChangeLanguage", () => {
      //   let language = this.$store.getters["user/value"];
      //   this.$i18n.locale = language;
      // });
    }
  },
  components: {
    Back,
    Xu
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
