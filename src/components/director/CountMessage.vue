<template>
  <div style="width: 900px">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :pull="10"><p style="font-size: 20px;"><strong>系统使用信息 :</strong></p></el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注 册 总 人 数: ' + countData.number }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注 册 学 生 数: ' + countData.student }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注 册 学 生 数: ' + countData.teacher }}
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'CountMessage',
    data(){
      return{
        countData:{
          number:"",
          teacher:"",
          student:""
        }
      }
    },
    methods:{
      initTable(){
        let url="/api/find.director.count.message";
        this.$axios.get(url)
          .then(res=>{
            this.countData=res.data
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
