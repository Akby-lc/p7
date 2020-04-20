<template>
  <div>
    <el-container>
      <!-- 头部登陆信息 -->
      <el-header class="login-header" height="50px">
        <span v-if="isLogin">
          你好,admin
          <el-button type="text" @click="logout">退出</el-button>
        </span>
        <span v-else>
          <el-button type="text" @click="showLogin = true">登陆</el-button>
        </span>
      </el-header>
      <!-- 头部的商品价格排序 -->
      <el-header class="sort-header" height="40px">
        排序:
        <span class="default">Default</span>
        <span @click="priceSort">
          价格
          <i class="el-icon-top" v-if="price_sort == 1"></i>
          <i class="el-icon-bottom" v-else></i>
        </span>
      </el-header>

      <el-container class="main">
        <!-- 左侧价格区间搜索 -->
        <el-aside class="sort-left">
          <h4>PRICE:</h4>
          <ul>
            <li
              v-for="(item,index) in money"
              :key="index"
              :class="{active: index == m_index}"
              @click="changePrice(index)"
            >{{item}}</li>
          </ul>
        </el-aside>

        <!-- 商品列表区域 -->
        <el-main  v-loading="loading" v-infinite-scroll="loadMore" infinite-scroll-immediate="false">
          <!-- 商品图片盒子 -->
          <div class="good-box" v-for="(item,index) in goodsList" :key="index">
            <!-- 商品图片信息 -->
            <div class="b-img">
              <img :src="'static/mock/img/'+item.productImage" />
            </div>

            <div class="good-info">
              <p class="b-title">{{item.productName}}</p>
              <p class="b-price">¥ {{item.salePrice | money}}</p>
            </div>
            <!-- 底部加入购物车的按钮 -->
            <div class="b-btn">
              <el-button type="danger" plain @click="addCart(item)">加入购物车</el-button>
            </div>
          </div>
        </el-main>
      </el-container>
      
      
    </el-container>

    <!-- 登陆对话框 -->
    <el-dialog title="登陆操作" :visible.sync="showLogin" width="30%">
      <el-form>
        <el-form-item>
          <el-input value="admin"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input value="admin888" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="login">立即登陆</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog
      title="加入购物车"
      :visible.sync="isCart"
      width="30%"
      center
      >
      <span>加入购物车成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isCart = false">继续购物</el-button>
        <el-button type="primary" @click="gotoCart">查看购物车</el-button>
      </span>
</el-dialog>
  </div>
</template>

<script>
export default {
  name: "",
  created() {
    //
    let mi = localStorage.getItem("mi_user");
    if (mi) {
      this.isLogin = true;
    }

    //请求接口数据
    this.$axios({
      url: "/static/mock/data1.json"
    }).then(res => {
      console.log(res);
      //获取数据
      if (res.status == 0) {
        let list = res.result.list;
        this.goods_list = list;
      }
    });
  },
  mounted() {
    document.title = "小米商城";
  },
  data() {
    return {
      //左侧价格区间数据
      money: ["All", "0-100", "100-500", "500-1000", "1000-2000", "2000-3000"],
      m_index: 0,

      //是否登陆
      isLogin: false,
      showLogin: false,

      //获取数据的page
      page: 1,
      goods_list: [],

      //排序和搜索
      price_sort: 1,
      loading: false,

      //购物车
      isCart: false,
    };
  },
  computed: {
      //计算属性
      goodsList(){
          let goods = this.goods_list;

          //价格区间搜索
          goods = this.goods_list.filter((item)=>{
              //获取价格区间
              let m = this.money[this.m_index];
              if(m != "All"){
                  let p = m.split("-");

                  if(item.salePrice >= p[0] && item.salePrice <= p[1]){
                      return true;
                  }
              }else{
                  return true;
              }
          });
          //排序
          goods.sort((a,b)=>{
              if(this.price_sort == 1){
                  return a.salePrice - b.salePrice;
              }else{
                  return b.salePrice - a.salePrice;
              }
          });
          console.log(goods);
          return goods;
      }
  },
  filters: {
    money(str) {
      return str.toFixed(2);
    }
  },
  methods: {
    //登陆操作
    login() {
      localStorage.setItem("mi_user", "admin");
      this.isLogin = true;
      this.showLogin = false;
    },
    logout() {
      localStorage.removeItem("mi_user");
      this.isLogin = false;
    },
    changePrice(index){
        this.m_index = index;
    },
    priceSort(){
        if(this.price_sort == 1){
            this.price_sort = 2;
        }else{
            this.price_sort = 1;
        }
    },

    //加入购物车
    addCart(goods){
      if(this.isLogin == false){
        alert("请先登录");
        return false;
      }

      this.isCart = true;
      //提交vuex的数据
      this.$store.commit("addCart",goods)
    },
    //跳转到购物车页面
    gotoCart(){
      this.$router.push("/mi/cart");
    },
    //加载更多的函数
    loadMore() {
      if(this.page>=3){
          return false;
      }
      this.page++;
      //加载中
      this.loading = true;
      //请求接口数据
      this.$axios({
        url: `/static/mock/data${this.page}.json`
      }).then(res => {
        console.log(res);
        //获取数据
        if (res.status == 0) {
            this.loading = false;
            setTimeout(()=>{
                let list = res.result.list;
                this.goods_list.push(...list);
            },2000);
          
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  cursor: pointer;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  font-size: 14px;

  //头部登陆区域
  .login-header {
    line-height: 50px;
    background-color: #fff;
    text-align: right;
  }
  .sort-header {
    background-color: #fff;
    line-height: 40px;
    margin-top: 30px;
    text-align: right;
    .default {
      color: #a00000;
      margin-right: 15px;
    }
  }
  // 主要区域
  .main {
    //左侧价格区间区域
    .sort-left {
      width: 260px;
      text-indent: 20px;

      ul {
        width: 95%;
        list-style: none;
        padding: 0px;
        margin-left: 4%;
        li {
          height: 25px;
          line-height: 25px;
          margin-top: 10px;
          margin-bottom: 10px;
          color: #505050;
          font-size: 13px;
        }
        li.active {
          border-left: #a00000 3px solid;
          font-weight: bold;
          color: #a00000;
        }
      }
    }

    //右侧商品列表区域
    .el-main {
      flex: 1;
      height: 700px;
      display: flex;
      flex-wrap: wrap;
      // 商品最外层的盒子

      .good-box:hover{
        transform: scale(1.02);
        box-shadow: 2px 2px 6px #a00000;
        border-radius: 5px;
      }
    }
  }
}

@media screen and(max-width: 960px){
  .sort-left{
    display: none;
  }

  .good-box {
        width: 98%;
        margin-left: 1%;
        margin-right: 1%;
        margin-bottom: 30px;
        background-color: #fff;
        display: flex;
        .b-img{
          width: 20%;
          img {
            width: 100%;
          }
        }
        
        .good-info{
          flex:1;
          .b-title {
          width: 100%;
          text-indent: 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .b-price {
          width: 100%;
          text-indent: 10px;
          font-size: 18px;
          color: #a00000;
        }
        }
        .b-btn{
          width: 20%;
          .el-button {
            width: 100%;
            margin-top:80px;
          }
        }
        
      }
}

@media screen and(min-width: 960px){
  .sort-left{
    display: block;
  }

  .good-box {
        width: 23%;
        margin-left: 1%;
        margin-right: 1%;
        margin-bottom: 30px;
        background-color: #fff;
        img {
          width: 93%;
        }
        .b-title {
          width: 100%;
          text-indent: 10px;
          font-size: 16px;
          font-weight: bold;
        }
        .b-price {
          width: 100%;
          text-indent: 10px;
          font-size: 18px;
          color: #a00000;
        }
        .el-button {
          width: 100%;
          margin-bottom: 5px;
        }
      }
}
</style>
