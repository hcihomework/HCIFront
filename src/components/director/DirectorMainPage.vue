<template>
  <div>
    <el-container style="height: 730px; border: 1px solid #eee;width: 1300px;margin: auto">
      <el-aside width="200px" style="background-color: white">
        <div style="width: 200px;height: 150px">
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

      <el-container>
        <el-header>
          <el-breadcrumb separator-class="/" style="font-size: 20px; margin: 20px; ">
            <el-breadcrumb-item>{{title_name}}</el-breadcrumb-item>
          </el-breadcrumb>
        </el-header>
        <el-main>
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
  export default {
    name: 'DirectorMainPage',
    components: {ApprovalTable,IssueApproval,CountMessage},
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
</style>
