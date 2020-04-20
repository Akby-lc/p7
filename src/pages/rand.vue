<template>
  <div class="main">

    <div id="rand">
        <div class="name" v-for="(item,index) in students" :key="index" :class="{active: ind===index}">{{item}}</div>
    </div>
    <el-button type="danger" @click="start" v-if="rand_status==false">开始点名</el-button>     
    <el-button type="danger" @click="stop" v-else>停止点名</el-button>     
  </div>
</template>

<script>
export default {
  name: '',
  mounted() {
      document.title = "最牛随机点名表";


  },
  data() {
    return {
        students:[
            '赵栩栋','李鹏','李傲康','孟志杰','石勇跃','张豪','段建伟','沈钰杰','张乾雍','金宝光','李帅','许慧东','曹钰','徐瑞','郭慧如',
            '郭晴','孟庆鹏','包勇军','高一超','高义','耿学东','邵静怡','孟宪雨','王璠帆','王成武','张鹏','王佳苑','王震宇','王健','房江涛',
            '李思楠','盖威','王迪','魏雅萌','魏新','苏宇浩','陈宇飞','孙亚楠','姚杰'
        ],
        rand_name: "开始点名",
        ind:"",
        txt: "开始点名",
        rand_status: false,
        timer: null,
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
      start(){
          this.timer = setInterval(()=>{
              let l = this.students.length;
             let randIndex = parseInt(Math.random()*l);
              console.log(randIndex);
              this.ind = randIndex;
              
          },50)
          this.rand_status = !this.rand_status;

         
      },
      stop(){
          clearInterval(this.timer);
          this.rand_status = !this.rand_status;
      }
  },
};
</script>

<style lang="scss" scoped>
    .main{
        width: 100%;
        min-height: 800px;
        text-align: center;
        background-color: #333;

        #rand{
            width:  800px;
            // min-height: 500px;
            text-align: center;
            border-radius: 5px;
            margin-top: 30px;
            margin: 0px auto;
            border: #A00000 2px solid;
            display: flex;
            flex-wrap: wrap;
            .name{
                width: 90px;
                height: 40px;
                line-height: 40px;
                background: #F0F0F0;
                margin: 5px 10px;
                border-radius: 3px;
            }
            .name.active{
                background-color: #A00000;
                color: #FFF;
            }
        }
    }
</style>
