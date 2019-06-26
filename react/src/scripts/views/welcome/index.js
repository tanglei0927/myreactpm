import {connect} from "react-redux"
import { changeLogin,checkLogin,changeLoginList } from "../../actions";
import "./index.less"
import imgurl from "@/assets/images/welcome.jpg"
import axios from "axios"
import history from "history"

@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            changelogin:(username)=>dispatch(changeLogin(username)),
            islogin:()=>dispatch(checkLogin()),
            changeLoginList:()=>dispatch(changeLoginList()),
        }
    }
)
export class Welcome extends Component{
    //判断token是否存在，存在：连接数据库，判断是否登录，更改登录状态，获取存在localstoreg中的用户名，登录失败，当做未登录
    //不存在，为未登录，不做修改
    checkToken(){
        // if(localStorage.token){
        //     console.log(localStorage.token)
        //     //连接数据库
        //     return true
        // }else{
        //     return false
        // }
        return localStorage.token?true:false;
    }

    componentDidMount(){
        var flag=this.checkToken();
        // var timer=null;
        this.props.islogin();
        setTimeout(() => {
            // clearTimeout();
            if(flag){
                //通过token判断登录状态，已登录跳转到首页，更改登录状态和用户名
                console .log("denglulllllllll")
                console.log(this.props)
                if(this.props.loginstate.login.type==1){
                  this.props.history.push("/app/home")
                  this.props.changelogin(this.props.loginstate.login.username)
                }else{
                    this.props.changeLoginList();//清空登录的返回值
                    this.props.history.push("/login");
                   
                }
           
              
            }else{
                  // 判断localstoreg:count次数  >1  不用导读  
                if(localStorage.count>=1){
                    //跳转至登录界面
                    console.log("toLogin")
                    console.log(this.history)
                    this.props.history.push("/login")
                }else{
                    localStorage.count=1;
                    //跳转至导读界面
                    console.log("toGuide")
                    // console.log(this.props.history)
                    this.props.history.push("/guide")
                }
            }
        }, 3000);
      
    }


    render(){
        const {
            loginstate:{
                status,
                username
            },
            changelogin,
            history
        }=this.props
        console.log("welcome")
        console.log(this.props)
        console.log(username)
        console.log(history)
        return(
            <div className="welcomepage">
              <img src={imgurl} alt=""/>
            </div>
           
        )
    }
}