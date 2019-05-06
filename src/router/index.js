import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import TeacherMainPage from '@/components/teacher/TeacherMainPage'
import DirectorMainPage from '@/components/director/DirectorMainPage'
import StudentMainPage from '@/components/student/StudentMainPage'
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
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path:'/teacher/mainpage',
      component:TeacherMainPage
    },
    {
      path: '/student',
      name: 'StudentMainPage',
      component: StudentMainPage
    }
  ],
  mode: 'history'
})
