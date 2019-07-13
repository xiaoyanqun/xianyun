export const state = ()=>({
  userInfo:{

  }
})

export const mutations =  {
  setUserInfo(state,data){
    state.userInfo = data
  },
  delUserInfo(state){
    state.userInfo = {}
  }
}

export const actions = {
  login( {commit},data ){
    this.$axios({
      url:'/accounts/login',
      method:'post',
      data
    }).then(res=>{
      commit('setUserInfo',res.data)
      console.log(this);
      this._vm.$message.success('登录成功，正在跳转')
      this.$router.push({path:'/'})
    })
  }
}