<template>
  <div class="check-div">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick" >
      <el-tab-pane label="已创建" name="CheckCreate" style="width: 200px"></el-tab-pane>
      <el-tab-pane label="已发布" name="CheckIssue"></el-tab-pane>
    </el-tabs>
    <component :is="table_view" v-on:changeTable="changeTable"></component>
  </div>
</template>

<script>
  import CheckCreate from '@/components/teacher/check/CheckCreate'
  import CheckIssue from '@/components/teacher/check/CheckIssue'
  export default {
    name: 'CheckCourses',
    components: {CheckCreate,CheckIssue},
    data() {
      return {
        activeName: '',
        table_view:''
      };
    },
    methods: {
      handleClick(tab, event) {
        this.table_view=this.activeName;
      },
      changeTable:function (table,course) {
        this.$emit("changeTable",table,course);
      }
    }
  }
</script>

<style scoped>
.check-div{
  margin-top: 50px;
  width: 900px;
}
</style>
