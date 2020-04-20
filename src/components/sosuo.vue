<template>
    <div id="app">
        <header>
     <van-search placeholder="搜索商品"  v-model="inp" /> 
     <button @click="add" >搜索</button> <button @click="shan" >删除</button>
            <nav>
                历史记录
            </nav>
        </header>
        <main>
            <p v-for="item in list">
                {{item}}
            </p>
        </main>
        <footer>

        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
           inp:'',
           list:[]
        };
    },
    created() {

    },
    mounted() {
      
    },
    methods: {
        add(){
            this.list.push(this.inp)
            this.inp=''
        },
        shan(){
            this.list=[]
        }
    }
};
</script>

<style scoped>
.tanchu{
    width: 100%;
    height: 350px;
    position: absolute;
    background: red;
    bottom: 20px;
}
html,body{
    height: 100%;
    display: flex;
    flex-direction: column;
}
#app {
  width: 100%;
  height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
}
header{
    height: 120px;  
}
main{
    height: 0;
    flex-grow: 1;


}
.price{
    color:red;
    font-size: 14px;
}
.add{
    margin-left: 55px;
    font-size: 14px;

}
.list{
    width: 100%;
    min-height: 101%;

    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    background: #f8f8f8;
    padding-top: 10px;
}
dl{
    width: 40%;
}
img{
    width: 100%;
}
dd{
    font-size: 12px;
}
dl,dd,dt{
    margin: 0;
    padding: 0;
}
.ul1{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 30px;
}
li{
    font-size: 12px;
}
.ul2{
    display: flex;
    align-items: center;
    height: 30px;
}
.ul2>li{
    margin-left: 10px;
}
</style>
