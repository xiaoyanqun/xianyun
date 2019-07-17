<template>
  <div class="menus-body">
    <ul class="menus">
      <li
        v-for="(item,index) in cityList"
        :key="index"
        class="menus-item"
        @mouseout="handleTab()"
        @mouseover="handleChangeTab(index)"
        :class="{active:currentTab === index}"
      >
        <span>{{item.type}}</span>
        <i class="el-icon-arrow-right" :class="{i:currentTab === index}"></i>
        
      </li>
    </ul>
    <div
          class="sub-menus"
          v-show="currentTab === index"
          @mouseout="currentTab = -1"
          @mouseover=" currentTab = index"
          v-for="(item,index) in cityList"
          :key="index"
        >
          <ul>
            <li v-for="(item1,index1) in item.children" :key="index1" >
              <nuxt-link :to="'/post?city='+item1.city">
                <em>{{index1+1}}</em>
                <strong>{{item1.city}}</strong>
                <span>{{item1.desc}}</span>
              </nuxt-link>
              </li>
          </ul>
        </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      currentTab: -1,
      cityList: []
    };
  },
  methods: {
    handleChangeTab(value) {
      this.currentTab = value;
      this.isShow = true;
      console.log(this.isShow);
    },
    handleTab() {
      (this.currentTab = -1), (this.isShow = false);
    }
  },
  mounted() {
    this.$axios({
      url: "/posts/cities"
    }).then(res => {
      console.log(res);
      this.cityList = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.menus-body {
  margin-bottom: 20px;
  position: relative;
  .menus {
    position: relative;
    background-color: #fff;
    z-index:5;
    border: 1px solid #ddd;
    border-bottom: none;
    border-right: none;

    .menus-item {
      height: 40px;
      line-height: 40px;
      padding: 0 20px;
      font-size: 14px;
      border-right: 1px solid #ddd;
      border-bottom: 1px solid #ddd;

      i {
        margin-left: 136px;
        font-size: 20px;
        color: #ddd;
      }
      .i {
        color: orange;
      }
   
    }
    .active {
      border-right: none;
      color: orange;
    }
  }
     .sub-menus {
        // display: none;
        z-index: 1;
        background-color: #fff;
        top: 0;
        right: -390px;
        position: absolute;
        border: 1px solid #ddd;
        width: 350px;
        padding: 10px 20px;
        ul {
          li {
            height: 36px;
            line-height: 36px;
            em {
              font-size: 24px;
              color: orange;
              font-style: italic;
              margin-right: 5px;
            }
            strong {
              &:hover {
                text-decoration: underline;
              }
              font-weight: 400;
              color: orange;
              margin-right: 5px;
              font-size: 14px;
            }
            span {
              &:hover {
                text-decoration: underline;
              }
              color: #999;
              font-size: 14px;
            }
          }
        }
      }
}
</style>

