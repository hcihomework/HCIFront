<template>
  <div>
    <div style="position: fixed;top: 0px;width: 100%;height:100px;background: #e5ebe4">
    <el-row>
      <el-col :span="6">
        <a href="/"><img src="@/assets/register.png" style="width: 300px;margin-top:18px;margin-left: 200px"></a>
      </el-col>
    </el-row>
    <el-row>
      <div style="margin-top: 0px;width: 100%;">
        <!--<el-divider></el-divider>-->
      </div>
    </el-row>
  </div>
    <div style="margin-left: 250px">

    <el-row style="margin-top: 100px">
     <el-col :span="8">
       <el-steps :active="activeStep" finish-status="success" simple style="margin-top: 20px;margin-left: 120px;width: 600px;background: white">
         <el-step title="邮箱验证" ></el-step>
         <el-step title="信息填写" ></el-step>
         <el-step title="注册成功" ></el-step>
       </el-steps>
     </el-col>
   </el-row>
    <div v-show="activeStep==0">
      <el-row style="margin-top: 30px">
      <el-col span="10" :pull="1">
        <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">身份</p>
      </el-col>
      <el-col span="10" :pull="9">
        <el-select v-model="identity" clearable placeholder="请选择" style="width: 270px">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-row >
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">邮箱</p>
        </el-col>
        <el-col span="10" :pull="9">
          <el-input prefix-icon="el-icon-message" type="email" v-model="registerForm.email" style="width: 270px"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col span="4" :push="2">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -110px;margin-top: 8px">验证码</p>
        </el-col>
        <el-col  span="10" :pull="4">
          <el-input  prefix-icon="el-icon-key" type="text" v-model="registerForm.captcha" autocomplete="off" style="width:130px;margin-left: -20px "></el-input>
        </el-col >
        <el-col  span="10" :pull="11" style="margin-left: -55px">
          <el-button :disabled="true" @click="countDown" class="captcha-button" style="width: 140px">{{content}}</el-button>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col span="6" :push="3">
          <el-button type="primary" style="width: 270px" @click="goPerson">下一步，填写个人信息</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-show="activeStep==1">
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">姓名</p>
        </el-col>
        <el-col span="10" :pull="9">
          <el-select v-model="identity" clearable placeholder="请选择" style="width: 270px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row >
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1"  style="margin-left: -8px">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">学工号</p>
        </el-col>
        <el-col span="10" :pull="9" style="margin-left: 8px">
          <el-input prefix-icon="el-icon-message" type="email" v-model="registerForm.email" style="width: 270px"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">密码</p>
        </el-col>
        <el-col span="10" :pull="9">
          <el-input prefix-icon="el-icon-view" type="email" v-model="registerForm.email" style="width: 270px"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1" style="margin-left: -12px">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">确认密码</p>
        </el-col>
        <el-col span="10" :pull="9" style="margin-left: 12px">
          <el-input prefix-icon="el-icon-view" type="email" v-model="registerForm.email" style="width: 270px"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin-top: 30px">
        <el-col span="6" :push="3">
          <el-button type="primary" style="width: 270px" @click="register">注册</el-button>
        </el-col>
      </el-row>
    </div>
    <div v-show="activeStep==3" style="margin-top: 100px;margin-left:-500px">
        <span style="font-size: 25px;color: #67C23A;">恭喜你，注册成功!<el-link type="primary" href="/" style="font-size: 25px;margin-top: -8px;margin-left: 10px">点击返回登陆</el-link></span>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data (){
      return {
        registerForm:{
          email:'',
          username:'',
          id:'',
          password:'',
          checkPassword:'',
          captcha:''
        },
        activeStep:0,
        emailBool:true,
        idBool:true,
        passwordBool:true,
        checkPasswordBool:true,
        captchaBool:true,
        timeLate:false,
        content:'发送验证码',
        totalTime: 60,
        identity: 'student',
        options: [{
          value: 'student',
          label: '学生'
        },{
          value: 'teacher',
          label: '教师'
        }],
      }
    },
    methods: {
      submitForm(){
        //注册
        //alert(this.registerForm.captcha)
        let url='/api/register';
        this.$axios.post(url,{
          'email': this.registerForm.email,
          'name': this.registerForm.username,
          'identity': this.identity,
          'id': this.registerForm.id,
          'password': this.registerForm.password,
          'captcha' :this.registerForm.captcha
        },{
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data=='success'){
            this.$message({
              message: '恭喜你，MyCourses注册成功',
              type: 'success'
            });
            this.$router.push({
                path:'/',
                query:{
                  'user':this.registerForm.email
                }
              }
            )
          }else {
            this.openMessage(res.data)
          }
        }).catch(error=>{
          console.log(error)
        })

      },
      countDown(){
        //验证码发送
        let url='/api/sendcode'
        this.$axios.get(url,{
          params: {
            'email': this.registerForm.email
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data!=true){
            open('请检查邮箱是否正确');
          }
        }).catch(error=>{
          console.log(error);
        })
        //发送倒计时
        this.timeLate=true;
        let clock = window.setInterval(() => {
          this.totalTime--
          if(this.totalTime<0){
            this.timeLate=false;
            window.clearInterval(clock);
            this.content = '重新发送';
            this.totalTime = 60;
          }else
            this.content = this.totalTime + 's'
        },1000)
      },
      goPerson(){
        this.activeStep++;
      },
      register(){
        this.activeStep++;
        this.activeStep++;
      },

      openMessage(message) {
        this.$alert(message, '注册错误', {
          confirmButtonText: '确定'
        });
      }
    }


  }
</script>
<style scoped>
  .radio-group{

  }

  .registerForm{
    width: 600px;
    margin: 10px auto;
  }
  .captcha-input{
    float: left;
    width: 70%;
  }
  .captcha-button{
    width: 30%;
    margin: 0 0 auto auto;
  }
  .register-button{
    width: 100%;
  }
</style>

