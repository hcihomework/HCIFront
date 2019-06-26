<template>
  <div style="width: 900px;overflow-y: hidden;overflow-x: hidden">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="24" :pull="10"><p style="font-size: 20px;"><strong>个人统计信息 :</strong></p></el-col>
    </el-row>
    <!--
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'注册时间: ' + countData.time }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    -->
    <el-row type="flex" class="row-bg" justify="center" style="margin-bottom: 30px">
      <div style="margin-left: -400px;margin-top: 50px">
      <el-row >
        <div id="courses" style="width: 400px;height: 250px"></div>
      </el-row>
        <el-row >
          <span><strong>选课统计</strong></span>
        </el-row>
      </div>
    </el-row>
    <!--<el-row type="flex" class="row-bg" justify="center">
      <el-col :span="16" :pull="0">
        <el-card class="box-card" style="width: 600px">
          <div  class="text item">
            {{'已 交 作 业  :   ' + countData.assignment+'  次' }}
          </div>
        </el-card>
      </el-col>
    </el-row>
    -->
  </div>
</template>

<script>
  export default {
    name: 'CountMessage',
    data(){
      return{
        charts: '',
        opinion:['已选择','已退选'],
        opinionData:[],
        countData:{
          selectCourses:"",
          dropCourses:"",
          assignment:"",
          time:""
        }
      }
    },
    methods:{
      initTable(){
        let url="/api/student/count.students";
        this.$axios.get(url)
          .then(res=>{
            this.countData=res.data
            let opt1={
              name:'已选择',
              value:res.data.selectCourses
            }
            let opt2={
              name:'已退选',
              value:res.data.dropCourses
            }
            this.opinionData.push(opt1)
            this.opinionData.push(opt2)
            this.drawPie("courses")
          }).catch(error=>{
          console.log(error)
        })
      },
      drawPie(id){
        this.charts = this.$echarts.init(document.getElementById(id))
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
          },
          legend: {
            orient: 'vertical',
            x: 'left',
            data:this.opinion
          },
          series: [
            {
              name:'课程',
              type:'pie',
              radius:['30%','80%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'blod'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.opinionData
            }
          ]
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
