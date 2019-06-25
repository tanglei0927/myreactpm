import { Toast } from "antd-mobile"
import './index.less'
import {NavLink} from  "react-router-dom"
import {connect} from "react-redux"
import { postData,changeLoginList,getYZNum } from "../../actions";


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
            getyzNum:(data)=>dispatch(getYZNum(data))
        }
    }
)
export class Yanz extends Component{

    state={
        flag:true,
        yanzFlag:true
    }
    
    checktell=()=>{
        const tellReg=/^1[3|4|5|6|7|8|9]\d{9}$/;
        if(tellReg.test(this.refs.tell.value)){
            this.setState({
                yanzFlag:false
            })
            if(this.refs.yanznum.value.length==4){
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
                flag:true,
                yanzFlag:true
            })
        }
        console.log(this.state.flag)
       
    }

    checknum=()=>{
        // console.log(this.refs.yanznum.value)
        // console.log(this.refs.yanznum.value.length)
        if(this.refs.yanznum.value.length==4){
            this.setState({
                flag:false
            })
        }else{
            this.setState({
                flag:true
            })
        }
        console.log(this.state.flag)
    }
    //登录
    login=()=>{
        this.props.gologin({mobile:this.refs.tell.value,code:this.refs.yanznum.value});
    }
    componentDidUpdate(){       
        // console.log("***********")
        
        if(this.props.loginstate.login.length!=0){
            if(this.props.loginstate.login.type==1){
                this.props.history.push("/app")
            }else{
                Toast.offline(this.props.loginstate.login.msg, 1);
                this.props.changeLoginList();//清空登录的返回值
            }         
        }
    }
    //获取验证码
    getNum=()=>{
        console.log(this.refs.loginbtn)

        this.props.getyzNum({mobile:this.refs.tell.value});
    }

    render(){
        const {
            flag,
            yanzFlag
        }=this.state
        return(
        <div className="yanzpage">          
             <input type="text" placeholder="请输入手机号" onChange={this.checktell} ref="tell" />                
            <p>
                <input type="text" placeholder="请输入验证码" onChange={this.checknum} className="yanznum" ref="yanznum" />
                <button className="checkbtn" onClick={this.getNum} disabled={yanzFlag}>发送到手机</button>
            </p>           
            <p style={{marginTop:"10px",textAlign:"left",lineHeight:1.5}}>
                温馨提示：未注册的用户手机号，登录时将自动注册，且代表您已同意<span>服务声明</span>
            </p> 
            <button type="submit" ref="loginbtn" disabled={flag} onClick={this.login}>登录</button>



        </div> 
        )
    }
}