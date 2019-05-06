<template>
<div style="font-size: 40px">
<!--<el-input-->
  <!--placeholder="输入关键字进行过滤"-->
  <!--v-model="filterText">-->
<!--</el-input>-->
<el-tree
  class="filter-tree"
  :data="data2"
  :props="defaultProps"
  default-expand-all
  @node-click="getID"
  :filter-node-method="filterNode"
  ref="tree2">
</el-tree>
</div>
</template>
<script>
  export default {
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
    data() {
      return {
        filterText: '',
        data2: [{
          label:'2018spring',
          children:[
            {
              label:'本科三年级 1',
              id:8,
              children:[
                {
                  label:"软件工程 2"
                }
              ]
            }
          ]
        },{
          label:'2017winter',
          children:[
            {
              label:"本科二年级",
              children:[
                {
                  label:"软件工程1"
                }
              ]
            }
          ]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      };
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      getID(node,ev){
        if(node.id!=undefined)
          console.log(node.id);
        else
          console.log("it is not courses");
      }
    }

  };
</script>
<style scoped>
  .div{
    font-size:20px;
  }
</style>
