<template>
  <div>
    <div class="backgroundImg">
      <img src="@/assets/登录背景.jpg"/>
    </div>
    <el-col :span="8" :push="4" style="top:80px">
      <div style="position:relative;background: white;width: 400px;height: 533px;border-radius: 10px;">

        <!--<div style="font-size: 20px;padding-top:30px">MYCOURSES</div>-->
        <img src="@/assets/MYCOURSES.png" style="width: 300px;height: 50px;padding-top:40px"/>
        <el-divider style="width: 300px; "><font color="gray">账号登陆</font></el-divider>

        <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm" label-width="100px" style="width: 380px;margin-left:-36px;">
          <el-form-item  prop="email" style="padding-top:30px">
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
            <el-divider style="padding-left: 50px"><el-link href="http://localhost:8080/register" :underline="false">注册新账号</el-link></el-divider>
          </el-form-item>
          <!--<router-link to="/register" style="font-size: 14px;margin-left: 100px;color: #CD8535">没有账号， 注册一个</router-link>-->
        </el-form>
      </div>
    </el-col>
  </div>
</template>
<script>
  export default {
    name: 'Login',
    data () {
      let cheakEmail = (rule, value, callback) => {
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
      let cheakPassword = (rule, value, callback) => {
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
        passwordBool:true,
        activeName: 'second'
      }
    },
    created:function () {

    },
    methods: {

    }
  }
</script>
<style scoped>
  .backgroundImg{
    background-size: cover;
    width: 800px;
    height: 100%;
    top: 0;
    z-index: -1;
    position: fixed;
  }

</style>
