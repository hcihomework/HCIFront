<template>
  <div>
    <div class="backgroundImg">
      <img src="@/assets/登录背景.jpg" />
    </div>
    <el-col :span="8" :push="4" style="top:80px">
      <div class="main-div">
        <el-row>
          <el-col :span="12">
            <div style="width: 30px;height:30px;background: linear-gradient(to bottom right, #409EFF,white ,white);"></div>
          </el-col>
          <el-col :span="11" :push="10">
            <div style="width: 33px;height:30px;background: linear-gradient(to bottom left, #409EFF,white ,white);"></div>
          </el-col>
        </el-row>
        <!--<div style="font-size: 20px;padding-top:30px">MYCOURSES</div>-->
        <img src="@/assets/MYCOURSES.png" style="width: 300px;height: 50px;padding-top:25px"/>
        <div style="background:linear-gradient(to left,white,#409EFF,white);height:1px;margin-top: 20px"></div>

        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" style="width: 380px;margin-left:-36px;">
          <el-form-item  prop="email" style="padding-top:50px">
            <el-input type="email"placeholder="邮箱" prefix-icon="el-icon-message" v-model="loginForm.email" autocomplete="off">
              <!--<template slot="append">@ nju.edu.cn</template>-->
            </el-input>
          </el-form-item>
          <el-form-item prop="password" style="padding-top:15px">
            <el-input type="password" placeholder="密码"prefix-icon="el-icon-view" v-model="loginForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item style="padding-top:15px">
            <el-button type="primary" style="width: 280px"  @click="submitForm()">登陆</el-button>
          </el-form-item>
          <el-form-item style="padding-top:15px">
            <el-divider style="padding-left: 50px;"><el-link href="/register-page" :underline="false">注册新账号</el-link></el-divider>
          </el-form-item>
          <!--<router-link to="/register" style="font-size: 14px;margin-left: 100px;color: #CD8535">没有账号， 注册一个</router-link>-->
        </el-form>
        <el-row style="margin-top:42px">
          <el-col :span="12">
            <div style="width: 30px;height:30px;background: linear-gradient(to top right, #409EFF,white ,white);"></div>
          </el-col>
          <el-col :span="11" :push="10">
            <div style="width: 33px;height:30px;background: linear-gradient(to top left, #409EFF,white ,white);"></div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    var cheakEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('邮箱不能为空'));
      } else {
        var njuEmail = value.split('@') ;
        if(njuEmail[1] != 'nju.edu.cn' && njuEmail[1]  != 'smail.nju.edu.cn'){
          return callback(new Error('请输入nju邮箱'));
        } else {
          this.emailBool=false;
          callback();
        }
      }
    };
    var cheakPassword = (rule, value, callback) => {
      if(!value){
        return callback(new Error('密码不能为空'));
      }else {
        this.passwordBool=false;
        callback();
      }
    };
    return {
      loginForm:{
        email:'',
        password:''
      },
      rules: {
        email: [
          {validator: cheakEmail, trigger: 'blur'}
        ],
        password: [
          {validator: cheakPassword, trigger: 'blur'}
        ]
      },
      emailBool:true,
      passwordBool:true
    }
  },
  created:function () {
    this.loginForm.email=this.$route.query.user;
  },
  methods: {
    submitForm (){
      let url='/api/login';
      this.$axios.get(url, {
        params: {
          'email': this.loginForm.email,
          'password': this.loginForm.password
        },
        headers: {
          'Content-Type': 'application/json;charset=UTF-8'
        }
      }).then(res=>{
        //alert(res.data)
        if(res.data!="fail"){
          sessionStorage.setItem("identity",res.data)
          if(res.data=="student"){
            this.$router.push('/student')
          }else if(res.data=="teacher"){
            this.$router.push('/teacher/mainpage')
          }else if(res.data=="director") {
            this.$router.push('/director')
          }
        }else {
          this.$message.error("登陆失败,请检查用户名或密码")
        }
      }).catch(error=>{
        this.$message.error("登陆失败,未知错误")
        console.log(error)
      })
    }
  }
}
</script>
<style scoped>
  .backgroundImg{
    /*background-size: cover;*/
    width: 100%;
    height: 100%;
    top: 0;
    left: -10px;
    z-index: -1;
    position: fixed;
  }
  .main-div{
    position:relative;
    background: white;
    width: 400px;
    height: 533px;
    border-style: solid;
    border-width: 1px;
    border-color: dodgerblue;
    /*background: linear-gradient(to bottom right, red , blue)*/
  }
</style>
