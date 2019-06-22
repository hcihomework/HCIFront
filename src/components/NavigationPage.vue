<template>
  <div style="position: fixed;top: 0;right: 10px;left: 10px;z-index: 5">
    <el-row style="background-color:mediumpurple;border-radius:5px">
      <el-col :span="6">
        <!--<button class="main-btn" @click="handleSelect()"></button>-->
        <a href="#"><img src="../assets/导航栏字体.png" style="width: 250px"></a>
      </el-col>
      <el-col :span="14" :push="9">
        <el-dropdown :hide-on-click="false">
        <span class="el-dropdown-link" style="cursor: pointer;">
          <el-col :span="10">
            <img src="@/assets/wang_headpic.jpg" style="width: 35px;border-radius:35px;margin-top: 5px">
          </el-col>
           <el-col :span="14">
             <div style="margin-top: 12px;width: 60px">
                  <span style="color: white">个人中心</span>
             </div>
           </el-col>
        </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus">个人中心</el-dropdown-item>
            <el-dropdown-item icon="el-icon-circle-plus">登出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="6" :push="8">

      </el-col>
    </el-row>

  </div>
</template>

<script>
    export default {
      name: "Navigation",
      data() {
        return {
          activeIndex: '1',
        };
      },
      methods: {
        handleSelect() {
          alert("i get")
        }
      }
    }
</script>

<style scoped>
  .main-btn{
    width: 280px;
    height: 50px;
    background-image: url("../assets/MYCOURSES.png");
    background-size: cover;
    background-color: rgba(255,255,255,0.2);
    border-style: none;
    outline: none;
  }

  .backgroundColor{
    background:#F00;
  }
</style>
