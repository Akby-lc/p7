<template>
    <div id="app">
        <header>
            <router-link to="sosuo"> <van-search placeholder="搜索商品" /> </router-link>
            <nav>
                <ul class="ul1">
                    <li v-for="item in titl" >
                        
                        {{item.title}}
                    </li>
                </ul>
                <ul class="ul2">
                    <li> 综合 </li>
                    <li> 销量 </li>
                    <li> 新品 </li>
                    <li>
                        <div v-if="isShow" @click="sort('xiao')">
                        从小到大
                        </div>
                        <div v-else @click="sort('da')">
                            从大到小
                        </div>
                    </li>
                    
                </ul>
            </nav>
        </header>
        <main>
            <div class="list">
                <dl v-for="item in list" >
                    <dt><img :src='item.pic' ></dt>
                    <dd>
                        <p>{{item.title}}</p>
                        <p> <span class="price">￥{{item.price}}</span>   <s> ￥{{item.old_price}} </s> 
                        <span class="add" @click="add(item)" >
                            <van-icon name="cart-o" />
                        </span> </p>
                        
                    </dd>
                </dl>

                <div class="tanchu" v-show="show" >
                    <dl v-for="item in irem" >
                    <dt><img :src='item.s_pic' ></dt>
                    <dd>
                        <p>{{item.title}}</p>
                        <p> <span class="price">￥{{item.price}}</span>   <s> ￥{{item.old_price}} </s> </p>
                        
                    </dd>
                    <button>添加购物车</button>
                </dl>
                </div>
            </div>
            
        </main>
        <footer>
            <van-tabbar v-model="active">
                <van-tabbar-item icon="home-o">首页</van-tabbar-item>
                <van-tabbar-item icon="search">热门</van-tabbar-item>
                <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
                <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
            </van-tabbar>
        </footer>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isShow : false,
            show: false,
            active: 0,
            titl:[],
            list:[],
            irem:[]
        };
    },
    created() {

    },
    mounted() {
        // 取出fenlei.json数据
        this.$axios('/static/fenlei.json').then(res=>{
            // console.log(res.result)
            this.titl = res.result
        }),
        // 取出list.js数据
        this.$axios('/static/list.json').then(res=>{
            // console.log(res.result)
            this.list=res.result
        })
    },
    methods: {
        add(item){
            console.log(item)
            this.show=!this.show
            this.irem.push(item)
        },
           // 排序
        sort(s){
            if(s=="xiao"){
                // 从小到大
                this.list.sort((a,b)=>{
                    return a.price - b.price
                })
            }else{
                // 从大到小
                this.list.sort((a,b)=>{
                    return b.price - a.price
                })
            }
            this.isShow = !this.isShow
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
