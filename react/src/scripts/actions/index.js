// import axios from 'axios'
import axios from "@/utils/axios"
export const CHANGELogin="changelogin";
export const changeLogin=(username)=>{
    return {
        type:CHANGELogin,
        username
    }
}
//登录
export const POSTAXIOS="axios";
export const postData=(data)=>(
    axios.post("/apir/login",data).then(res=>(
        {
            type:POSTAXIOS,
            data:res.data
        }
    ))
)

//登录失败，清空返回值
export const CHLlIST="changeloginlist"
export const changeLoginList=()=>{
    return{
        type:CHLlIST
    }
}
// 获取验证码
export const POSTYZNUM="getyanzhengnum"
export const getYZNum=(data)=>(
    axios.post("/apir/add",data).then(res=>(
        {
            type:POSTYZNUM,
            Yzdata:res.data
        }
    ))
)

//获取音乐数据
export const GETMUSIC="getmusic";
export const getMusic=()=>{
    console.log("getmussic")
   
   return axios.get("/apir/musiclist").then(res=>(
        {
            type:GETMUSIC,
            musicData:res.data
        }
    ))
}
   


//验证是否已登录
export const CHECKLOGIN="checklogin";
export const checkLogin=()=>(
    axios.post("/apir/islogin").then(res=>(
        {
            type:CHECKLOGIN,
            data:res.data
        }
    ))
)

export const LOGOUT="logout"
export const Logout=()=>{
    return {
        type:LOGOUT
    }
}


//获取新闻信息
export const CHECKNEWS="getnews";
export const checkNew=()=>(
    axios.get("/apir/news").then(res=>(
        {
            type:CHECKNEWS,
            data:res.data
        }
    ))
)