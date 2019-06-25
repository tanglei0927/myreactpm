import { CHANGELogin,POSTAXIOS,CHLlIST,POSTYZNUM,CHECKLOGIN } from "../actions";

const defaultState={
   status:false,
   username:"请登录" ,
   login:[],
   Yzdata:[]
}

export default (state=defaultState,action)=>{
    switch(action.type){
        case CHANGELogin:
            console.log("login")
            return {...state,...{status:true,username:action.username}};
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
        default:
            return state;
            break;
    }
}