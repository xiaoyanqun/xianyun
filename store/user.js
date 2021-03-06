export const state = () => ({
  userInfo: {

  }
})

export const mutations = {
  setUserInfo(state, data) {
    state.userInfo = data
  },
  delUserInfo(state) {
    state.userInfo = {}
  }
}

export const actions = {
  login({
    commit
  }, data) {
    this.$axios({
      url: '/accounts/login',
      method: 'post',
      data
    }).then(res => {
      commit('setUserInfo', res.data)
      console.log(this);
      this._vm.$message.success('登录成功，正在跳转')
      this.$router.back();
    })
  },
  register({
    commit,
    dispatch
  }, data) {
    this.$axios({
      url: '/accounts/register',
      method: 'post',
      data
    }).then(res => {
      const {
        username,
        password
      } = JSON.parse(res.config.data)
      dispatch('login', {
        username,
        password
      })
    })
  },
  // 验证码
  verification(store, username) {
    this.$axios({
      url: '/captchas',
      method: 'post',
      data: {
        tel: username
      }
    }).then(res => {
      this._vm.$alert(`验证码是${res.data.code}`,'提示',{
          type:'warning'
      })
    })
  }
}
