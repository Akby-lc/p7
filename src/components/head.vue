<template>
    <div>
        <header>
            <span></span>
            <span>学习记事本</span>
            <span class='el-icon-more' v-on:click="end"></span>
        </header>
    </div>
</template>

<script>
export default {
    data() {
        return {

        };
    },
    created() {

    },
    mounted() {

    },
    methods: {
        end(){
            this.$emit("end")
        }
    }
};
</script>

<style scoped>
header{
    width: 100%;
    height: 65px;
    background: pink;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
span:nth-of-type(2){
    font-size: 30px;
    color: #fff;
}
</style>
