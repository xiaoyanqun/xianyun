<template>
  <div class="menus-body">
    <ul class="menus">
      <li
        class="menus-item"
        @mouseout="handleTab()"
        @mouseover="handleChangeTab(0)"
        :class="{active:currentTab === 0}"
      >
        <span>热门城市</span>
        <i class="el-icon-arrow-right" :class="{i:currentTab === 0}"></i>
      </li>
      <li
        class="menus-item"
        @mouseout="handleTab()"
        @mouseover="handleChangeTab(1)"
        :class="{active:currentTab === 1}"
      >
        <span>推荐城市</span>
        <i class="el-icon-arrow-right" :class="{i:currentTab === 1}"></i>
      </li>
      <li
        class="menus-item"
        @mouseout="handleTab()"
        @mouseover="handleChangeTab(2)"
        :class="{active:currentTab === 2}"
      >
        <span>奔向海岛</span>
        <i class="el-icon-arrow-right" :class="{i:currentTab === 2}"></i>
      </li>
      <li
        class="menus-item"
        @mouseout="handleTab()"
        @mouseover="handleChangeTab(3)"
        :class="{active:currentTab === 3}"
      >
        <span>主题推荐</span>
        <i class="el-icon-arrow-right" :class="{i:currentTab === 3}"></i>
      </li>
    </ul>
    <div class="sub-menus" v-show="isShow" @mouseout="isShow = false" @mouseover="isShow = true">
      <ul>
        <li>
          <nuxt-link to="/">
            <em>1</em>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <em>2</em>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <em>3</em>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <em>4</em>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <em>5</em>
            <strong>北京</strong>
            <span>世界著名古都和现代化国际城市</span>
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
      currentTab: -1
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
    z-index: 2;
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

