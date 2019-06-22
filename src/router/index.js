import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/Register'
import TeacherMainPage from '@/components/teacher/TeacherMainPage'
import DirectorMainPage from '@/components/director/DirectorMainPage'
import StudentMainPage from '@/components/student/StudentMainPage'
import LoginPage from "../components/main/LoginPage";
import HelloWorld from "../components/HelloWorld";
import StudentPage from "../components/hci-student/StudentPage";
import RegisterPage from "../components/main/RegisterPage";
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/director',
      name: 'DirectorMainPage',
      component: DirectorMainPage
    },
    {
      path: '/',
      component: LoginPage
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/register-page',
      component: RegisterPage
    },
    {
      path:'/teacher/mainpage',
      component:TeacherMainPage
    },
    {
      path: '/student',
      name: 'StudentMainPage',
      component: StudentMainPage
    },
    {
      path:'/test',
      component:StudentPage
    }
  ],
  mode: 'history'
})
