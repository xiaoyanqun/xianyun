import {Message} from "element-ui";
// 全局错误拦截
export default function({$axios,redirect}){
    $axios.onError(err => {
      console.log(err.response);
        const {statusCode, message} = err.response.data;
        if(statusCode === 400){
            Message.warning({message});
        }
        // 未授权
        if( statusCode === 401 || statusCode === 403 ){
            // 跳转到登录页
            redirect("/user/login");
        }
    })
}