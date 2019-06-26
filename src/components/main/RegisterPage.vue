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
      <el-form :label-position="labelPosition" label-width="80px" :rules="rulesOne" :model="registerForm" style="width: 350px;margin-left: 140px;margin-top: 30px">
        <el-form-item label="身份" >
          <el-select v-model="identity" clearable placeholder="请选择" style="width: 270px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input prefix-icon="el-icon-message" type="email" v-model="registerForm.email" autocomplete="off" style="width: 270px"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="captcha">
              <el-input  prefix-icon="el-icon-key" type="text" v-model="registerForm.captcha" autocomplete="off" style="width:135px"></el-input>
              <el-button :disabled="emailBool" @click="countDown" class="captcha-button" style="width: 130px">{{content}}</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary":disabled="emailBool||captchaBool||nextStep" style="width: 270px" @click="goPerson()">下一步，填写个人信息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-show="activeStep==1">
      <el-form :model="registerForm" status-icon :rules="rulesTwo" ref="registerForm" label-width="100px" style="width: 420px;margin-left: 140px;margin-top: 30px">
        <el-form-item label="姓名" prop="username">
          <el-input prefix-icon="el-icon-document" type="text" v-model="registerForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="学/工号" prop="id">
          <el-input prefix-icon="el-icon-edit-outline" type="text" v-model="registerForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input prefix-icon="el-icon-view" type="password" v-model="registerForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword">
          <el-input prefix-icon="el-icon-view" type="password" v-model="registerForm.checkPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="passwordBool||checkPasswordBool"  @click="submitForm()" class="register-button">注册</el-button>
        </el-form-item>
      </el-form>
      <!--
      <el-row style="margin-top: 30px">
        <el-col span="10" :pull="1">
          <p style="font: 16px/1.5 'Microsoft yahei', arial, Simsun, sans-serif;margin-left: -100px;margin-top: 8px">姓名</p>
        </el-col>
        <el-col span="10" :pull="9">
          <el-input prefix-icon="el-icon-user" type="email" v-model="registerForm.email" style="width: 270px"></el-input>
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
      -->
    </div>
    <div v-show="activeStep==2" style="margin-top: 100px;margin-left:-500px">
        <span style="font-size: 25px;color: #67C23A;">恭喜你，注册成功!<el-link type="primary" href="/" style="font-size: 25px;margin-top: -8px;margin-left: 10px">点击返回登陆</el-link></span>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data (){
      let checkEmail= (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        } else {
          let njuEmail = value.split('@') ;
          if(njuEmail[1] != 'nju.edu.cn' && njuEmail[1]  != 'smail.nju.edu.cn'){
            return callback(new Error('请输入nju邮箱'));
          } else {
            this.emailBool=false;
            callback();
          }
        }
      };
      let checkCaptcha = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('验证码不能为空'));
        }else if(value.length!=6){
          return callback(new Error('验证码为6位'));
        }else {}
        this.captchaBool=false;
        callback();

      };
      let passwordRule  = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('密码不能为空'));
        }else if(value.length<6||value.length>15){
          return callback(new Error('密码长度为6-15位'));
        }else{
          this.passwordBool=false;
          callback();
        }
      };
      let checkPasswordRule  = (rule, value, callback) =>{
        if(!value){
          return callback(new Error('密码不能为空'));
        }else if(value!=this.registerForm.password){
          return callback(new Error('密码不一致'));
        }else{
          this.checkPasswordBool=false;
          callback();
        }
      };
      return {
        registerForm:{
          email:'',
          username:'',
          id:'',
          password:'',
          checkPassword:'',
          captcha:''
        },
        rulesOne: {
          email: [
            {validator: checkEmail, trigger: 'blur'}
          ],
          captcha: [
            {validator: checkCaptcha,trigger: 'blur'}
          ]
        },
        rulesTwo: {
          password: [
            {validator: passwordRule, trigger: 'blur'}
          ],
          checkPassword: [
            {validator: checkPasswordRule, trigger: 'blur'}
          ],
        },
        activeStep:0,
        nextStep:false,//后续测试修改
        emailBool:true,
        captchaBool:true,
        passwordBool:true,
        checkPasswordBool:true,
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
          if(res.data=='exist'){
            this.openMessage('该邮箱已被注册');
          }else if(res.data=='fail'){
            this.openMessage('请检查邮箱是否正确');
          }else {
            this.nextStep=false
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
      isCaptcha(){
        let url='/api/checkcaptcha'
        this.$axios.get(url,{
          params:{
            "captcha":this.registerForm.captcha,
          },
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          }
        }).then(res=>{
          if(res.data!='success'){
            open(res.data);
          }else{
            this.activeStep++;
          }
        }).catch(error=>{
          console.log(error);
        })
      },
      goPerson(){
        this.isCaptcha();
      },
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
            this.activeStep++;
          }else {
            this.openMessage(res.data)
          }
        }).catch(error=>{
          console.log(error)
        })

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

