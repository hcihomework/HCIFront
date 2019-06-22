<template>
  <div class="all">
    <Navigation></Navigation>
    <el-container style="height: 730px;width: 1300px;margin: auto;position:relative;top: 100px">
      <el-aside width="200px" style="background-color: white;border-radius: 10px" >
        <div style="width: 200px;height: 150px;margin-top: 20px">
          <img src="@/assets/wang_headpic.jpg" class="person-img">
        </div>
        <el-menu :default-openeds="['1']" @select="handleSelect">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>审批管理</template>
            <el-menu-item-group>
              <el-menu-item index="ApprovalTable">建课审批</el-menu-item>
              <el-menu-item index="IssueApproval">开课审批</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-tickets"></i>统计信息</template>
            <el-menu-item-group>
              <el-menu-item index="CountMessage">统计信息</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>


      <el-container style="position: relative; left: 30px;right: 50px;background-color: white;border-radius: 5px;">
        <el-header style="border-radius: 5px;background-color: dimgrey">
          <el-breadcrumb separator="/" style="font-size: 20px; margin: 20px;">
            <el-breadcrumb-item><a href="#" style="color: white">{{title_name}}</a></el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main style="position: relative;left: 0;right: 0;background-color: white">
          <component class="component" :is="table_view"></component>
        </el-main>
      </el-container>

    </el-container>
  </div>
</template>

<script>
  import ApprovalTable from '@/components/director/ApprovalTable'
  import IssueApproval from '@/components/director/IssueApproval'
  import CountMessage from '@/components/director/CountMessage'
  import Navigation from "@/components/NavigationPage.vue"
  export default {
    name: 'DirectorMainPage',
    components: {ApprovalTable,IssueApproval,CountMessage,Navigation},
    data(){
      return{
        title_name:"建课审批",
        table_view:"ApprovalTable"
      }
    },
    methods:{
      handleSelect(key) {
        if(key=="ApprovalTable")
          this.title_name="建课审批";
        if(key=="IssueApproval")
          this.title_name="开课审批";
        if(key=="CountMessage")
          this.title_name="统计信息";
        this.table_view=key;
      }
    }
  }
</script>

<style scoped>
  .person-img {
    border-radius: 100%;
    width:140px;
    height:140px;
    margin: 0 auto;
    position:relative;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .all{
    background: linear-gradient(to bottom, #C0C4CC 0%,#ffffff 100%);
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
  }
</style>
