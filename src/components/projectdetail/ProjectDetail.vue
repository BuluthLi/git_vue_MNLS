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
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>

      <div class="msg-box">
        <div class="title">{{good.pname}}</div>
        <div class="type">产品类别：{{good.type_name}}</div>
        <div class="size">主要规格：{{good.spec_name}}</div>
        <div class="intro">产品介绍：{{good.desc}}</div>
      </div>
    </div>
    <div class="right">
      <div class="project-box">
        <div class="title">项目案例</div>
        <ul class="project-content">
          <li
            v-for="(item,index) in projectExample.data"
            :key="index"
            class="project-item"
            @click="onPreviewImg(item.big_img)"
          >
            <!-- <div
              class="project-cover"
              :style="{backgroundImage:'url('+item.img_url+')'}"
              @click="onPreviewImg(item.big_img)"
            ></div>-->
            <!-- <div class="project-cover progressive" @click="onPreviewImg(item.big_img)">
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
            <div class="project-name">{{item.pic_name}}</div>
            <img
              src="../../common/images/234.png"
              class="vr-btn"
              alt
              v-show="item.vr_url"
              @click.stop="onOpenVR(item.vr_url)"
            />
          </li>
        </ul>
        <div class="pagenation" :style="{marginTop:marginTop}" v-show="projectData.total>2">
          <Page
            :current="projectData.currentPage"
            :total="projectData.total"
            :page-size="projectData.per_size"
            @on-change="onPageChange($event,1)"
            class-name="mypage"
          />
        </div>
      </div>
      <div class="apply-box">
        <div class="title" :style="{marginTop:marginTop}">应用案例</div>
        <ul class="apply-content">
          <li
            v-for="(item,index) in applyExample.data"
            :key="index"
            class="apply-item"
            @click="onPreviewImg(item.big_img)"
          >
            <!-- <div
              class="apply-cover"
              :style="{backgroundImage:'url('+item.img_url+')'}"
              @click="onPreviewImg(item.big_img)"
            ></div>-->
            <!-- <div class="apply-cover progressive" @click="onPreviewImg(item.big_img)">
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
              @click.stop="onOpenVR(item.vr_url)"
            />
          </li>
        </ul>
        <div class="pagenation" :style="{marginTop:marginTop}" v-show="applyData.total>2">
          <Page
            :current="applyData.currentPage"
            :total="applyData.total"
            :page-size="applyData.per_size"
            @on-change="onPageChange($event,2)"
            class-name="mypage"
          />
        </div>
      </div>
    </div>
    <Back v-on:changestatus="reChangeStatus(1)"></Back>
    <ImgPreview :url="targetUrl" :flag="flag" v-on:onHideImg="onHidenImg"></ImgPreview>
  </div>
</template>
<script>
import Vue from "vue";
import Back from "@/components/back/Back.vue";
import { Page } from "iview";
import Swiper from "swiper";
import ImgPreview from "@/components/imgpreview/ImgPreview.vue";
Vue.component("Page", Page);
var mySwiper = null;
export default {
  data() {
    return {
      good: {}, //当前瓷砖
      mainCover: "", //瓷砖显示大图
      bigMainCover: "",
      routerParams: {}, //路由参数，瓷砖id + 零售或工程类型，
      category_id: 3, //默认选中案例类型是客厅
      projectExample: [],
      applyExample: [],
      projectData: {
        per_size: 2,
        total: 0,
        currentPage: 1
      },
      applyData: {
        per_size: 2,
        total: 0,
        currentPage: 1
      },
      targetUrl: "",
      flag: false
    };
  },
  computed: {
    marginTop: function() {
      if (
        this.projectData.total > this.projectData.per_size &&
        this.applyData.total > this.applyData.per_size
      ) {
        return "0.4rem";
      } else {
        return "1rem";
      }
    }
  },
  mounted() {
    let _this = this;
    let query = this.$router.history.current.query || { id: 26, type: 1 };
    this.routerParams = query;
    this.getCZdetail(query.id, 1);
    new Promise(function(resolve, reject) {
      _this.getExample(query.id, 1, 1);
      resolve();
    }).then(() => {
      _this.getExample(query.id, 2, 1);
    });
  },
  updated() {
    if (mySwiper) {
      mySwiper.update();
    }
  },
  methods: {
    //   获取工程区瓷砖详情
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
    //切换主图片
    onChangeCover: function(cover, index) {
      this.mainCover = cover;
      this.bigMainCover = this.good.big_pics[index];
    },
    onPageChange: function(page, type) {
      // console.log(page, type);
      this.getExample(this.routerParams.id, type, page);
    },
    //获取案例,type是1为项目案例，2为应用案例
    getExample: function(id, type, page, pagesize) {
      pagesize = pagesize || type == 1 ? 2 : 2;
      let params = new window.FormData();
      params.append("id", id);
      params.append("type", type);
      params.append("page", page);
      params.append("pagesize", pagesize);
      // if (type == 1) {
      //   this.projectExample = [];
      // } else {
      //   this.applyExample = [];
      // }
      this.$http
        .post(process.env.API_HOST + "projectexample", params)
        .then(res => {
          // console.log(res.data);
          if (res.data.status == 1) {
            if (type == 1) {
              this.projectExample = res.data.data; //res.data.data.data是实际数据
              this.projectData = {
                per_size: 2,
                total: res.data.data.total,
                currentPage: page
              };
            } else {
              this.applyExample = res.data.data; //res.data.data.data是实际数据
              this.applyData = {
                per_size: 2,
                total: res.data.data.total,
                currentPage: page
              };
            }
          }
        });
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
  padding-top: 1rem;
  color: black;
  .left {
    width: 40%;
    box-sizing: border-box;
    padding-left: 1.88rem;
    .cover-box {
      width: 7rem;
      height: 7rem;
      box-sizing: border-box;
      padding: 0.5rem;
      border: 0.02rem solid #a2a2a2;
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
    margin-left: 12%;
    padding-right: 0.7rem;
    box-sizing: border-box;
    .title {
      font-size: 0.72rem;
      width: auto;
      width: 4.52rem;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      background: #015536;
      display: inline-block;
      color: white;
    }
    .project-box {
      .project-content {
        margin-top: 0.6rem;
        height: 6.2rem;
        .project-item {
          display: inline-block;
          list-style: none;
          width: 5rem;
          height: 5rem;
          margin-right: 1.2rem;
          position: relative;
          .project-cover {
            width: 5rem;
            height: 5rem;
            overflow: hidden;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }
          .project-name {
            margin-top: 0.2rem;
            white-space: nowrap;
            width: 100%;
            text-overflow: ellipsis;
            overflow: hidden;
            text-align: center;
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
      }
      // .pagenation {
      //   margin-top: 0.4rem;
      // }
    }
    .apply-box {
      // .title {
      //   margin-top: 0.4rem;
      // }
      .apply-content {
        margin-top: 0.6rem;
        .apply-item {
          display: inline-block;
          list-style: none;
          width: 8.92rem;
          height: 6.68rem;
          margin-right: 0.94rem;
          position: relative;
          .apply-cover {
            width: 8.92rem;
            height: 6.68rem;
            overflow: hidden;
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
          }

          .vr-btn {
            position: absolute;
            z-index: 33;
            width: 2rem;
            right: 0;
            top: 0;
            cursor: pointer;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
      // .pagenation {
      //   margin-top: 0.4rem;
      // }
    }
  }
}
</style>


