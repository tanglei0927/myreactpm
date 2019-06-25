import { Toast } from "antd-mobile"
import './index.less'
import {NavLink} from  "react-router-dom"
import {connect} from "react-redux"
import { postData,changeLoginList,changeLogin } from "../../actions";


@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            gologin:(data)=>dispatch(postData(data)),
            changeLoginList:()=>dispatch(changeLoginList()),
            changelogin:(username)=>dispatch(changeLogin(username))
        }
    }
)
export class Pwd extends Component{
    state={
        flag:true
    }
    
    checktell=()=>{
        const tellReg=/^1[3|4|5|6|7|8|9]\d{9}$/;
        if(tellReg.test(this.refs.tell.value)){
            if(this.refs.pwd.value){
                this.setState({
                    flag:false
                })
            }else{
                this.setState({
                    flag:true
                })
            }
         
        }else{
            this.setState({
                flag:true
            })
        }
       
    }

    checkpwd=()=>{
        if(this.refs.pwd.value==""){
            this.setState({
                flag:true
            })
        }else{
            const tellReg=/^1[3|4|5|6|7|8|9]\d{9}$/;
            if(tellReg.test(this.refs.tell.value)){            
                this.setState({
                    flag:false
                })
             }
        }
        
    }
    //登录
    login=()=>{
        this.props.gologin({mobile:this.refs.tell.value,password:this.refs.pwd.value});
    }
    componentDidUpdate(){       
        if(this.props.loginstate.login.length!=0 &&this.state.flag==false){
            if(this.props.loginstate.login.type==1){
                localStorage.token=this.props.loginstate.login.token;
                var username=this.props.loginstate.login.username?this.props.loginstate.login.username:this.refs.tell.value;
                this.props.changelogin(username)
                this.props.history.push("/app")
            }else{
                Toast.offline(this.props.loginstate.login.msg, 1);
                this.props.changeLoginList();//清空登录的返回值
            }         
        }
    }


    render(){
        const {
            flag
        }=this.state
        const {
            gologin
        }=this.props
        // console.log("45125")
        // console.log(this.props)
        // console.log(this.state)
        return(
           <div className="pwdpage">
               <input type="text" placeholder="请输入手机号" onChange={this.checktell} ref="tell"/>
               <input type="password" placeholder="请输入密码" onChange={this.checkpwd} ref="pwd"/>
               <button type="submit" className="loginbtn" disabled={flag} onClick={this.login}>登录</button>
               <div className="zhuce">
                    <NavLink to="/login/yanz" style={{float:"left"}}>注册账号</NavLink>
                    <NavLink to="/login/yanz" style={{float:"right"}}>忘记密码</NavLink>
               </div>
           </div> 
        )
    }
}