<template>
    <div class="div">
        <Details :data="list"/>
        <Gdmap :data="list"/>
        <Comments :data="list"/>
    </div>

</template>
<script>
import Details from '@/components/hotel/details'
import Gdmap from '@/components/hotel/gdmap'
import Comments from '@/components/hotel/comments'
export default {
    data(){
        return{
            list:{}
        }
    },
   components:{
       Details,
       Gdmap,
       Comments
   },
   mounted(){
       this.$axios({
           url:'http://157.122.54.189:9095/hotels',
           params:{id:this.$route.query.id}
       }).then(res=>{
           console.log(res.data)
           this.list = res.data.data[0]
           console.log(this.list)
       })
   }
}
</script>
<style lang="less" scoped>
.div{
    width: 1000px;
    margin:0 auto;
}
</style>


