<template>

  <div style="min-width: 1000px">
    <H1>消息列表</H1>
    <el-collapse v-model="activeNames" @change="handleChange" >
      <el-collapse-item
        v-for="item in tableData" :title='"时间："+item.time+"，类型："+item.type+"，发件人："+item.fromWhere' :name='item'>
        <div style="position: relative;background-color: whitesmoke;text-align: left;border: blue 1px;bottom: 0;font-size: 14px;color: dimgrey">
          <div style="margin: 8px">消息：{{item.message}}</div>
        </div>
      </el-collapse-item>
    </el-collapse>

  </div>

</template>

<script>
  export default {
    name: 'News',
    data(){
      return{
        tableData:[]
      }
    },
    methods:{
      initTable(){
        let url="/api/select.news";
        this.$axios.get(url)
          .then(res=>{
            this.tableData=res.data
            this.tableData.reverse()
          }).catch(error=>{
          console.log(error)
        })
      }
    },
    created () {
      this.initTable();
    }
  }
</script>

<style scoped>

</style>
