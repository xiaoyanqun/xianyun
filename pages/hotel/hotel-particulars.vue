<template>
    <div class="div">
        <Details :data="list"/>
        <Gdmap :data="list"/>
        <Comments :list="list"/>
        <HptelPl v-for="(item,index) in pllist" :key="index" :list="item"/>
    </div>

</template>
<script>
import Details from '@/components/hotel/details'
import Gdmap from '@/components/hotel/gdmap'
import Comments from '@/components/hotel/comments'
import HptelPl from '@/components/hotel/hotel-pl.vue'
export default {
    data(){
        return{
            list:{},
            pllist:[]
        }
    },
   components:{
       Details,
       Gdmap,
       Comments,
       HptelPl
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
    //    获取评论
        this.$axios({
      url:'http://157.122.54.189:9095/hotels/comments'
    }).then(res=>{
      console.log(res.data)
      this.pllist = res.data.data
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


