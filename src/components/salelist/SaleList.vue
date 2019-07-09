<template>
  <div class="salelist">
    <div class="header-box">
      <div class="title">常规零售选材区------{{routerParams.title}}用砖</div>
      <div class="search-box" v-show="status==0">
        <img src="./search.png" alt @click="onDoSearch" />
        <input
          type="text"
          placeholder="产品搜索"
          class="search"
          v-model="value"
          @keyup.enter="onDoSearch"
        />
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
        <!-- <div class="cover" ref="blurimage" :style="{backgroundImage:'url('+item.img_url+')'}"></div> -->
        <!-- <div class="cover progressive">
          <img
            class="preview"
            :src="item.big_img+'?x-oss-process=image/resize,w_103'"
            v-progressive="item.big_img+'?x-oss-process=image/resize,w_800'"
            alt
          >
        </div>-->
        <progressive-background
          :src="item.big_img+'?x-oss-process=image/resize,w_800'"
          :placeholder="item.big_img+'?x-oss-process=image/resize,w_100'"
          :blur="5"
        />
        <div class="intro">{{item.pname}}</div>
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
import { sendMessage, blurImage } from "../../common/js/util";
export default {
  data() {
    return {
      routerParams: { id: 3, title: "客厅" },
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
    let query = this.$router.history.current.query;
    query.title = this.name(parseInt(query.id));
    this.routerParams = query;
    this.getPageData(1, query.id);
  },
  methods: {
    name(id) {
      let name = "客厅";
      switch (id) {
        case 3:
          name = "客厅";
          break;
        case 4:
          name = "餐厅";
          break;
        case 5:
          name = "厨房";
          break;
        case 6:
          name = "卫生间";
          break;
        case 7:
          name = "卧室";
          break;
        case 8:
          name = "书房";
          break;
        case 9:
          name = "阳台";
          break;
        case 10:
          name = "玄关";
          break;
        case 11:
          name = "庭院";
          break;
        case 12:
          name = "商用空间";
          break;
        case 13:
          name = "休闲区域";
          break;
        default:
          name = name = "客厅";
          break;
      }
      return name;
    },
    onPageChange: function(page) {
      this.currentPage = page;
      // console.log(page);
      let title = this.isSearch ? this.value : "";
      this.getPageData(page, this.routerParams.id, title);
    },
    getPageData: function(page, id, title, size) {
      size = size || this.per_size;
      let params = new window.FormData();
      params.append("content_id", id);
      params.append("page", page);
      params.append("pagesize", size);
      if (title) {
        params.append("pname", title);
      }
      // this.list = [];
      this.$http
        .post(process.env.API_HOST + "retaildetail", params)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            this.list = res.data.data.data;
            this.total = res.data.data.total;
            // this.$nextTick(() => {
            //   blurImage(this);
            // });
          }
        });
    },
    onIntoDetail: function(id) {
      sendMessage(1);
      this.$router.push({
        path: "/main/salelist/saledetail",
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
      _this.getPageData(1, _this.routerParams.id, title);
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
.salelist {
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
      color: #00561f;
      align-items: center;
      justify-content: center;
      border-radius: 0.2rem;
    }
  }
  .content {
    position: absolute;
    top: 2.5rem;
    bottom: 3rem;
    left: 0.7rem;
    right: 0.7rem;
    overflow: hidden;
    overflow-y: auto;
    .item {
      display: inline-block;
      width: 6.1rem;
      height: 6.1rem;
      margin: 1rem 0.8rem 0 0.8rem;
      .cover {
        width: 6.1rem;
        height: 6.1rem;
        // background-size: cover;
        // background-position: center;
        // background-repeat: no-repeat;
        overflow: hidden;
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
      &:nth-child(5n) {
        margin: 0.2rem 0rem 0 0.8rem;
      }
      &:nth-child(5n + 1) {
        margin: 0.2rem 0.8rem 0 0rem;
      }
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


