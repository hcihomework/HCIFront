<template>
  <div>
    <div class="backgroundImg">
      <img src="@/assets/主背景.jpg" alt=""/>
    </div>
    <div class="nav">
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
    <el-menu-item index="1">处理中心</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" disabled>消息中心</el-menu-item>
    <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
  </el-menu>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


<style scoped>
  .backgroundImg{
    background-size: cover;
    width: 100%;
    height: 100%;
    top: 0;
    z-index: -1;
    position: fixed;
  }

  .nav{
    position:fixed; /* 绝对定位，fixed是相对于浏览器窗口定位。 */
    top:0; /* 距离窗口顶部距离 */
    left:0; /* 距离窗口左边的距离 */
    width:100%; /* 宽度设置为100% */
    height:40px; /* 高度 */
    z-index:99; /* 层叠顺序，数值越大就越高。页面滚动的时候就不会被其他内容所遮挡。 */
  }
</style>
