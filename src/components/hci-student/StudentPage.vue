<template>
  <div>

  <navigation-page></navigation-page>
  <el-aside width="200px" style="background-color: white">
    <el-menu :default-openeds="['1','2']" style="overflow-x: hidden;height: 700px;">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-menu"></i>课程管理</template>
        <el-menu-item-group>
          <el-menu-item index="MyCourses" style="margin-left: 15px">我的课程</el-menu-item>
          <el-menu-item index="ChooseCourses" style="margin-left: 15px">学期选课</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-setting"></i>个人中心</template>
        <el-menu-item-group>
          <el-menu-item index="ModifyMessage" style="margin-left: 15px">信息修改</el-menu-item>
          <el-menu-item index="CountMessage" style="margin-left: 15px">信息统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
    <el-main>
      <courses-list-page></courses-list-page>
    </el-main>
  </div>
</template>

<script>
  import NavigationPage from "@/components/NavigationPage"
  import CoursesListPage from "@/components/hci-student/CoursesListPage"
    export default {
        name: "StudentPage",
        components:{NavigationPage,CoursesListPage},
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
    left: 165px;
    top:100px;
    position: fixed;

  }
  .person-img {
    border-radius: 100%;
    width:140px;
    height:140px;
    margin: 0 auto;
    position:relative;
  }
  .el-main{
    margin: auto;
  }
</style>
