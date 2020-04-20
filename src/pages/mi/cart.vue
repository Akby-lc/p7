<template>
  <div class="cart">
    <table>
      <tr>
        <th></th>
        <th>商品信息</th>
        <th>商品单价</th>
        <th>商品数量</th>
        <th>商品小计</th>
        <th>商品操作</th>
      </tr>

      <tr v-for="(item,index) in this.$store.state.goods_cart" :key="index" >
        <td><input type="checkbox" v-model="item.checked"></td>
        <td>
          <img style="width: 50px;" :src="'/static/mock/img/'+item.productImage"/>
          {{item.productName}} </td>
        <td>¥ {{item.salePrice}}</td>
        <td>
          <button>-</button>
          <input type="text" v-model="item.count">
          <button @click="incr(index)">+</button>
        </td>
        <td>
          ¥ {{item.count*item.salePrice}}
        </td>
        <td>
          <i class="el-icon-delete"></i>
        </td>
      </tr>
      <tr>
        <td colspan="1">
          <input type="checkbox"> 全选
        </td>
        <td colspan="5">
          总价格: <strong>¥ {{this.$store.getters.totalAmount}}</strong>
        </td>
        </tr>
    </table>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    incr(index){
      this.$store.commit("increment",index);
    }
  },
};
</script>

<style lang="scss" scoped>
  .cart{
    width: 100%;
    min-height: 300px;
    background-color: #F0F0F0;
    table{
      width: 960px;
      margin: 50px auto;
      border-collapse: collapse;
      border-spacing: 0px;
      background-color: #FFF;
      td,th{
        padding: 10px;
        //text-align: center;
      }
      tr{
        border-top: #dddddd 1px solid;
        border-bottom: #dddddd 1px solid;
      }
    }
  }
</style>
