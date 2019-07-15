import {Message} from "element-ui";
// 全局错误拦截
export default function({$axios}){
    $axios.onError(err => {
      console.log(err.response);
        const {statusCode, message} = err.response.data;
        if(statusCode === 400){
            Message.warning({message});
        }
    })
}