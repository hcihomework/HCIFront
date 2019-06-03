<template>
  <div>
      <navigation-page></navigation-page>
  </div>

</template>

<script>
  import NavigationPage from "@/components/NavigationPage"
export default {
  name: 'HelloWorld',
  components:{NavigationPage},
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .radio-beauty-container {
    font-size: 0;

   }
  .radio-name {
    vertical-align: middle;
    font-size: 16px;
  }
  .radio-beauty {
    width: 18px;
    height: 18px;
    box-sizing: border-box;
    display: inline-block;
    border: 1px solid ;
    vertical-align: middle;
    margin: 0 15px 0 3px;
    border-radius: 50%;
  }



</style>
