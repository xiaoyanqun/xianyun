   // 使用这个插件可以让vuex中的数据自动保存到本地，并且从新加载页面是从新获取

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
    window.onNuxtReady(() => {
        createPersistedState({
            key: "store", // 读取本地存储的数据到store可以随便取名
        })(store)
    })
}