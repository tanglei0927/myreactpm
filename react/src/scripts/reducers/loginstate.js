import { CHANGELogin,POSTAXIOS,CHLlIST,POSTYZNUM,CHECKLOGIN, LOGOUT } from "../actions";

const defaultState={
   status:false,
   username:"请登录" ,
   touimg:"http://47.102.144.31:1901/images/shuim/goodbj.jpg",
   login:[],
   Yzdata:[]
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case CHANGELogin:
            console.log("login")
            return {...state,...{status:true,username:action.username,touimg:action.touimg?actions.touimg:state.touimg}};
            break;
        case POSTAXIOS:
            console.log("login---")
            console.log(action.data)
            return {...state,...{login:action.data}};
            break;
        case CHLlIST:
            return{...state,...{login:[]}};
            break;
        case POSTYZNUM:
            return {...state,...{Yzdata:action.Yzdata}};
            break;
        case CHECKLOGIN:
            return {...state,...{login:action.data}};
            break;
        case LOGOUT:
            return {...state,...{status:false,username:"请登录",touimg:"http://47.102.144.31:1901/images/shuim/goodbj.jpg"}}
        default:
            return state;
            break;
    }
}