<template>
  <div class="good">
      <maska class="mask" v-if="b" ></maska>
    <hade v-on:end="end"></hade>
    
    <div class="hello">
      <input placeholder="请输入内容" @keyup.13='add' v-model="inp"></input>
      <el-button type="danger"  >提交</el-button>
    </div>

    <listy></listy>
  </div>
</template>

<script>
import hade from './head'
import listy from './list'
import maska from './mask'
export default {
  data() {
    return {
      inp: "",
      list:[],
      b:false
    };
  },
  mounted() {
      
  },
  methods: {
      todoList() {
        window.localStorage.setItem('list', JSON.stringify(this.list))
        },
      end(end){
          this.b=!this.b;
      },
      add(){
        var item = {
            name: this.inp,
            select: false,
        };
        this.list.push(item);
        this.inp = "";
        this.todoList()
        console.log(this.list)
      }
  },
      components :{
        hade,listy,maska
    }
};
</script>

<style scoped>
input{
    width: 70%;
    border: 1px solid ;
    border-radius: 4px;
}
.hello {
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;
  justify-content: space-around;
}
.mask{
    position: absolute;
    flex: 1;
}
.good{
    position: relative;
}
</style>
