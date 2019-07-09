<template>
  <div class="saledetail">
    <div class="left">
      <div class="cover-box" @click="onPreviewImg(bigMainCover)">
        <!-- <div class="inner-box" :style="{backgroundImage:'url('+mainCover+')'}"></div> -->
        <!-- <div class="inner-box progressive">
          <img
            class="preview"
            :src="bigMainCover+'?x-oss-process=image/resize,w_103'"
            v-progressive="bigMainCover+'?x-oss-process=image/resize,w_800'"
            alt
          >
        </div>-->
        <progressive-background
          :src="bigMainCover+'?x-oss-process=image/resize,w_800'"
          :placeholder="bigMainCover+'?x-oss-process=image/resize,w_100'"
          :blur="5"
        />
      </div>
      <div class="img-wrapper">
        <div class="swiper-container img-list">
          <div class="swiper-wrapper">
            <div
              v-for="(item,index) in good.pics"
              :key="index"
              v-show="good.pics.length>0"
              class="swiper-slide img-item"
              @click="onChangeCover(item,index)"
            >
              <div class="item-cover" :style="{backgroundImage:'url('+item+')'}"></div>
            </div>
          </div>
        </div>
        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>

      <div class="msg-box">
        <div class="title">{{good.pname}}</div>
        <div class="type">产品类别：{{good.type_name}}</div>
        <div class="size">主要规格：{{good.spec_name}}</div>
        <div class="intro">产品介绍：{{good.desc}}</div>
      </div>
    </div>
    <div class="right">
      <div class="title">应用区域</div>
      <ul class="type-box">
        <li
          v-for="(item,index) in typeList"
          :key="index"
          class="type-item"
          @click="onChangeCategory(item.content_id)"
        >
          <div
            class="type-item-text"
            :class="(item.content_id==category_id)?'type-item-active':''"
          >{{item.cname}}</div>
        </li>
      </ul>
      <ul class="example-box">
        <li
          v-for="(item,index) in typeData"
          :key="index"
          class="type-data-item"
          @click="onPreviewImg(item.big_img)"
        >
          <!-- <div
            class="type-data-cover"
            :style="{backgroundImage:'url('+item.img_url+')'}"
            @click="onPreviewImg(item.big_img)"
          ></div>-->
          <!-- <div class="type-data-cover progressive" @click="onPreviewImg(item.big_img)">
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
          <img
            src="../../common/images/234.png"
            class="vr-btn"
            alt
            v-show="item.vr_url"
            @click="onOpenVR(item.vr_url)"
          />
        </li>
      </ul>
      <div class="pagenation" v-show="pageData.total>4">
        <Page
          :current="pageData.currentPage"
          :total="pageData.total"
          :page-size="pageData.per_size"
          @on-change="onPageChange"
          class-name="mypage"
        />
      </div>
    </div>
    <Back v-on:changestatus="reChangeStatus(1)"></Back>
    <ImgPreview :url="targetUrl" :flag="flag" v-on:onHideImg="onHidenImg"></ImgPreview>
  </div>
</template>
<script>
import Vue from "vue";
import { Page } from "iview";
Vue.component("Page", Page);
import Back from "@/components/back/Back.vue";
import ImgPreview from "@/components/imgpreview/ImgPreview.vue";
import Swiper from "swiper";

var mySwiper = null;

export default {
  data() {
    return {
      good: {}, //当前瓷砖
      mainCover: "", //瓷砖显示大图
      bigMainCover: "",
      routerParams: {}, //路由参数，瓷砖id + 零售或工程类型，
      category_id: "", //默认选中案例类型是客厅
      typeList: [], //案例应用分类
      typeData: [], //案例应用当前分类数据，
      pageData: {
        currentPage: 1,
        total: 0,
        per_size: 4
      },
      targetUrl: "",
      flag: false
    };
  },
  mounted() {
    let query = this.$router.history.current.query || { id: 26 };
    this.routerParams = query;
    this.getCZdetail(query.id, 2);
    this.getCategory(this.routerParams.id, this.category_id, 1); //默认全部
  },
  updated() {
    if (mySwiper) {
      mySwiper.update();
    }
  },
  methods: {
    getCZdetail: function(id, type) {
      let params = new window.FormData();
      params.append("id", id);
      params.append("main_type", type);
      this.$http
        .post(process.env.API_HOST + "productdetail", params)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            this.good = res.data.data;
            this.initSwiper();
            this.mainCover = res.data.data.pics[0];
            this.bigMainCover = res.data.data.big_pics[0];
          }
        });
    },
    // 初始化swiper
    initSwiper: function() {
      mySwiper = new Swiper(".swiper-container", {
        slidesPerView: 4,
        autoplay: {
          delay: 3000
        },
        loop: false,
        grabCursor: true,
        parallax: true,
        observe: true,
        // 如果需要前进后退按钮
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      });
    },
    getCategory: function(id, category_id, page, per_size) {
      per_size = per_size || 4;
      let params = new window.FormData();
      params.append("id", id);
      params.append("content_id", category_id + "");
      params.append("page", page);
      params.append("pagesize", per_size);
      // this.typeData = [];
      this.$http
        .post(process.env.API_HOST + "retailexample", params)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            this.typeList = [
              { cname: "全部", content_id: "", is_current: 0 }
            ].concat(res.data.apply_area);
            this.typeData = res.data.data.data;
            this.pageData = {
              currentPage: page,
              total: res.data.data.total,
              per_size: 4
            };
          }
        });
    },
    onChangeCategory: function(content_id) {
      this.category_id = content_id;
      this.getCategory(this.routerParams.id, content_id, 1);
    },
    onChangeCover: function(cover, index) {
      this.mainCover = cover;
      this.bigMainCover = this.good.big_pics[index];
    },
    onPageChange: function(page) {
      this.getCategory(this.routerParams.id, this.content_id, page);
    },
    onOpenVR: function(url) {
      window.open(url, "_blank", "toolbar=yes, width=1300, height=900");
    },
    onPreviewImg: function(targetUrl) {
      this.targetUrl = targetUrl;
      this.flag = true;
    },
    onHidenImg: function() {
      this.targetUrl = "";
      this.flag = false;
    },
    reChangeStatus: function() {}
  },
  components: {
    Back,
    ImgPreview
  }
};
</script>
<style lang="less" scoped>
.saledetail {
  font-size: 0.56rem;
  display: flex;
  padding-top: 1.32rem;
  color: black;
  .left {
    width: 40%;
    box-sizing: border-box;
    padding-left: 1.88rem;
    .cover-box {
      width: 8rem;
      height: 8rem;
      box-sizing: border-box;
      padding: 0.5rem;
      border: 0.02rem solid #333;
      display: flex;
      align-items: center;
      overflow: hidden;
      .inner-box {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }
    }
    .img-wrapper {
      position: relative;
      padding: 0 2rem 0 1.5rem;
      box-sizing: border-box;
      height: 2rem;
      .swiper-button-next,
      .swiper-button-prev {
        display: none;
        outline: none;
      }
      &:hover {
        .swiper-button-next,
        .swiper-button-prev {
          display: inline-block;
        }
      }
      .swiper-button-prev {
        width: 2rem;
        left: -0.5rem;
        right: auto;
        background-image: url(../../common/images/left.png);
        background-size: contain;
      }

      .swiper-button-next {
        width: 2rem;
        right: 0rem;
        left: auto;
        background-image: url(../../common/images/right.png);
        background-size: contain;
      }
      .img-list {
        width: 100%;
        height: 2rem;
        margin-top: 0.4rem;
        .img-item {
          list-style: none;
          // width: 2rem;
          height: 2rem;
          // margin: 0 0.2rem;
          .item-cover {
            width: 2rem;
            height: 2rem;
            overflow: hidden;
            background-position: center;
            background-repeat: no-repeat;
            background-size: contain;
          }
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
        &::-webkit-scrollbar {
          width: 2px;
          color: #333;
          display: block;
        }
      }
    }

    .msg-box {
      margin-top: 1.8rem;
      font-size: 0.6rem;
      .title {
        font-size: 0.8rem;
        font-weight: bold;
      }
      div {
        margin-top: 0.2rem;
      }
      .type {
        margin-top: 0.4rem;
      }
    }
  }
  .right {
    width: 55%;
    margin-left: 8%;
    padding-right: 0.7rem;
    box-sizing: border-box;
    .title {
      font-size: 0.8rem;
      font-weight: bold;
      color: black;
    }
    .type-box {
      .type-item {
        list-style: none;
        display: inline-block;
        margin: 0.4rem 0.8rem 0 0;
        font-size: 0.48rem;
        text-align: center;
        min-width: 2rem;
      }
      .type-item-active {
        background: #015536;
        color: white;
        padding: 0.1rem 0.2rem;
      }
    }
    .example-box {
      width: 20rem;
      .type-data-item {
        list-style: none;
        margin: 0.8rem 0.6rem 0 0;
        display: inline-block;
        position: relative;
        width: 9.1rem;
        height: 6.8rem;
        .type-data-cover {
          display: inline-block;
          width: 9.1rem;
          height: 6.8rem;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }
        .vr-btn {
          position: absolute;
          z-index: 33;
          width: 2rem;
          right: 0;
          top: 0;
          cursor: pointer;
        }
      }
      li:nth-child(2n) {
        margin-right: 0;
      }
    }
    .pagenation {
      margin-top: 0.6rem;
    }
  }
}
</style>


