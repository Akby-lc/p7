<template>
  <div>
    <el-row class="tac">
      <el-col :span="12">
          <!-- 未完成 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="pink"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title">
              <span>未完成</span>
            </template>

            <ul>
              <li v-for=" (item,index) in list " v-if="!item.select">
                <!-- 多选框 -->
                <input type="checkbox" @click="lak_checked(item)" v-model="item.select" />

                <span>{{item.name}}</span>

                <el-button @click="quxiao(index)" >取消</el-button>
              </li>
            </ul>
          </el-submenu>
        </el-menu>
        <!-- 已完成 -->
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="pink"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title">
              <span>已完成</span>
            </template>

            <ul>
              <li v-for="(item,index) in list" v-if="item.select">
                <!-- 多选框 -->
                <input type="checkbox" @click="lak_checked(item)" v-model="item.select" />
                <span>{{item.name}}</span>
                <!-- 显示时间 -->
                <span> {{gettime}} </span>
              </li>
            </ul>
          </el-submenu>
        </el-menu>
        <!-- 已取消 -->
         <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="pink"
          text-color="#fff"
          active-text-color="#ffd04b">

          <el-submenu index="1">
            <template slot="title">
              <span>已取消</span>
            </template>

            <ul>
              <li v-for="(item,index) in list" v-if="a">
                <!-- 多选框 -->
                <input type="checkbox" @click="lak_checked(item)" v-model="item.select" />

                <span>{{item.name}}</span>

               
              </li>
            </ul>
          </el-submenu>
        </el-menu>


      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
        gettime:'',//当前时间
        a:false,
        list:[]
    };
  },
//   props: {
//     list: {
//       type: Array
//     }
//   },
  methods: {
    //   取消
    quxiao(item,index){
        this.a = true
    },
      // 点击多选框时
    lak_checked(item) {
      item.select = !item.select;
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    getTime:function(){
      var _this = this;
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth()+1;
      let dd = new Date().getDate();
      let hh = new Date().getHours();
      let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
    //   let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
      _this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf;
    },
    // currentTime(){
    //   setInterval(this.getTime,500)
    // },
  },
  mounted() {
        this.getTime() 
        // 取出本地存储
        let list = localStorage.getItem('list')
        if (list) {
            this.list = JSON.parse(list)
        }
    },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  width: 375px;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
li{
    background: #fff;
}
</style>
