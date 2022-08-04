<template>
  <!-- 可视区域的容器 -->
  <div ref="list" class="infinite-list-container" @scroll="scrollEvent($event)">
    <!-- 容器内的占位，高度为总列表高度，非常大，用于形成滚动条 -->
    <div
      class="infinite-list-phantom"
      :style="{ height: listHeight + 'px' }"
    ></div>
    <!-- 列表项的渲染区域，只渲染可见的那十几二十条 -->
    <div class="infinite-list" :style="{ transform: getTransform }">
      <div
        ref="items"
        class="infinite-list-item"
        v-for="item in visibleData"
        :key="item.id"
        :style="{ height: itemSize + 'px', lineHeight: itemSize + 'px' }"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "VirtualList",
  props: {
    //所有列表数据
    listData: {
      type: Array,
      default: () => [],
    },
    //每项高度
    itemSize: {
      type: Number,
      default: 200,
    },
  },
  computed: {
    // 所有项加起来的超长高度，撑开滚动条
    listHeight() {
      return this.listData.length * this.itemSize;
    },
    // 可显示的列表项数
    visibleCount() {
      return Math.ceil(this.screenHeight / this.itemSize);
    },
    //偏移量对应的style
    getTransform() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
    //获取真实显示列表数据
    visibleData() {
      return this.listData.slice(
        this.start,
        Math.min(this.end, this.listData.length)
      );
    },
  },
  mounted() {
    // 初始化可视区域高度、起始索引、结束索引。
    this.screenHeight = this.$el.clientHeight;
    this.start = 0;
    this.end = this.start + this.visibleCount;
    console.log("可视区域高度", this.screenHeight);
    console.log("每项高度", this.itemSize);
    console.log("可见项数", this.visibleCount);
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
    };
  },
  methods: {
    scrollEvent() {
      // 每一次滚动，计算滚动了多少距离

      //离开顶部
      let scrollTop = this.$refs.list.scrollTop;
      //开始索引
      this.start = Math.floor(scrollTop / this.itemSize);
      //结束索引
      this.end = this.start + this.visibleCount;
      // 偏移量是 "整数倍的项距离"，比如每项高度是100，那么偏移量就是 100, 200, 300, 400, ...
      this.startOffset = scrollTop - (scrollTop % this.itemSize);
      console.log("离开顶部", scrollTop);
      console.log("开始索引", this.start);
      console.log("结束索引", this.end);
      console.log("离开顶部多少项", this.startOffset);
    },
  },
};
</script>


<style scoped>
.infinite-list-container {
  height: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
}

.infinite-list-phantom {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
}

.infinite-list {
  left: 0;
  right: 0;
  top: 0;
  position: absolute;
  text-align: center;
}

.infinite-list-item {
  padding: 10px;
  color: #555;
  box-sizing: border-box;
  border-bottom: 1px solid #999;
}
</style>