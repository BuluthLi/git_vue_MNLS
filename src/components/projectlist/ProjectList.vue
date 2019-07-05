<template>
  <div class="projectlist">
    <div class="header-box">
      <div class="title">战略工程选材区------工程用砖</div>
      <div class="search-box" v-show="status==0">
        <img src="./search.png" alt @click="onDoSearch">
        <input
          type="text"
          placeholder="产品搜索"
          class="search"
          v-model="value"
          @keyup.enter="onDoSearch"
        >
      </div>
      <button class="search-box-spectial" v-show="status==1" @click="onChangeStatus(0)">点击搜索</button>
    </div>
    <ul class="content">
      <li
        v-for="(item,index) in list"
        :key="index"
        v-show="list.length>0"
        class="item"
        @click="onIntoDetail(item.id)"
      >
        <progressive-background
          :src="item.big_img+'?x-oss-process=image/resize,w_800'"
          :placeholder="item.big_img+'?x-oss-process=image/resize,w_50'"
          :blur="5"
        />
        <div class="intro" :title="item.pname">{{item.pname}}</div>
      </li>
    </ul>

    <div class="pagenation" v-show="total>10">
      <Page
        :current="currentPage"
        :total="total"
        :page-size="per_size"
        @on-change="onPageChange"
        class-name="mypage"
      />
    </div>
    <Back v-on:changestatus="reChangeStatus(1)"></Back>
  </div>
</template>
<script>
import Vue from "vue";
import { Page } from "iview";
Vue.component("Page", Page);
import Back from "@/components/back/Back.vue";
import { sendMessage } from "../../common/js/util";
// import { blurImage } from "../../common/js/util";
export default {
  data() {
    return {
      // routerParams: {},
      currentPage: 1,
      list: [],
      total: 0,
      value: "",
      prevValue: "",
      isSearch: false,
      per_size: 10,
      status: 1 //0搜索，1识别芯片（默认为1）
    };
  },
  mounted() {
    // let query = this.$router.history.current.query || { id: 3, title: "客厅" };
    // this.routerParams = query;
    this.getPageData(1);
  },
  methods: {
    onPageChange: function(page) {
      this.currentPage = page;
      // console.log(page);
      let title = this.isSearch ? this.value : "";
      this.getPageData(page, title);
    },
    getPageData: function(page, title, size) {
      size = size || this.per_size;
      let params = new window.FormData();
      params.append("page", page);
      params.append("pagesize", size);
      if (title) {
        params.append("pname", title);
      }
      // 先置空，真难顶
      // this.list = [];
      this.$http.post(process.env.API_HOST + "project", params).then(res => {
        // console.log(res.data);
        if (res.data.status == 1) {
          this.list = res.data.data.data;
          this.total = res.data.data.total;

          // 渲染好的下个周期
          // this.$nextTick(() => {
          //   autoImg("progressive");
          // });
        }
      });
    },
    onIntoDetail: function(id) {
      sendMessage(1);
      this.$router.push({
        path: "/projectlist/projectdetail",
        query: { id: id }
      });
    },
    onDoSearch() {
      let _this = this;
      let title = _this.value.trim();
      if (!this.value.trim()) {
        alert("搜索为空");
        return;
      }
      if (title == _this.prevValue) {
        alert("请不要重复搜索");
        return;
      }
      _this.status = 1;
      _this.prevValue = title;
      _this.currentPage = 1;
      _this.isSearch = true;
      sendMessage(1);
      _this.getPageData(1, title);
    },
    onChangeStatus: function(status) {
      this.status = status;
      sendMessage(status);
    },
    reChangeStatus: function(status) {
      this.status = status;
    }
  },
  components: {
    Back
  }
};
</script>
<style lang="less" scoped>
.projectlist {
  .header-box {
    font-size: 0.96rem;
    margin: 1rem 2.7rem 0.4rem 0.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .title {
      font-size: 0.96rem;
    }
    .search-box {
      width: 5rem;
      height: 1.2rem;
      border: 0.02rem solid #4c4c4c;
      display: flex;
      align-items: center;
      padding: 0 0.4rem;
      border-radius: 0.2rem;
      img {
        width: 0.8rem;
      }
      .search {
        font-size: 0.64rem;
        margin-left: 0.4rem;
        flex: 1;
        width: 3rem;
        border: none;
        outline: none;
      }
    }
    .search-box-spectial {
      width: 5rem;
      height: 1.2rem;
      border: 0.02rem solid #4c4c4c;
      display: flex;
      font-size: 0.6rem;
      align-items: center;
      color: #00561f;
      justify-content: center;
      border-radius: 0.2rem;
    }
  }
  .content {
    position: absolute;
    top: 2.5rem;
    bottom: 3rem;
    left: 0.2rem;
    right: 0rem;
    overflow: hidden;
    overflow-y: auto;
    .item {
      display: inline-block;
      width: 6.1rem;
      height: 6.1rem;
      margin: 1rem 0.7rem 0 0.7rem;
      .cover {
        width: 6.1rem;
        height: 6.1rem;
        overflow: hidden;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      }
      .intro {
        font-size: 0.48rem;
        white-space: nowrap;
        overflow: hidden;
        width: 100%;
        text-overflow: ellipsis;
        margin-top: 0.1rem;
        text-align: center;
      }
      // &:nth-child(5n) {
      //   margin: 0.2rem 0rem 0 0.8rem;
      // }
      // &:nth-child(5n + 1) {
      //   margin: 0.2rem 0.8rem 0 0rem;
      // }
    }
  }
  .pagenation {
    position: fixed;
    bottom: 1rem;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>


