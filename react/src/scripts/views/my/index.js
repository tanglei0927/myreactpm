import "./index.less"
import {connect} from "react-redux"
import { List } from 'antd-mobile';
import { Logout } from "../../actions";



const Item = List.Item;

@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            logOut:()=>dispatch(Logout())
        }
    }
)
export class My extends Component{
    check=()=>{
        if(this.props.loginstate.status){
            //已登录 ==>查看积分  得积分
            alert("看积分")
        }else{
            this.props.history.push("/login")
        }
    }

    logforOut=()=>{
        // alert("退出登录")
        localStorage.token=""
        this.props.logOut();
    }


    render(){
        const {
            loginstate:{
                username,
                touimg,
                logOut

            }
        }=this.props
        console.log(this.props)
        return (
            <div className="mypage">
                <div className="title">
                    <div className="touxiang">
                        <img src={touimg} alt=""/>
                    </div>
                    <div className="islogin" onClick={this.check}>
                        <p>{username}</p>
                        <p>查看积分   <i className="iconfont icon-you"></i></p>
                    </div>
                </div>
                <div>
                    <List className="my-list">                    
                        <Item arrow="horizontal"><i className="iconfont icon-shouji"></i> 我的设备</Item>
                        <Item arrow="horizontal"><i className="iconfont icon-collection"></i> 我的收藏</Item>
                        <Item arrow="horizontal"><i className="iconfont icon-iconset0456"></i> 发现好友</Item>                        
                        <Item arrow="horizontal"><i className="iconfont icon-wentidan"></i> 常见问题</Item>
                        <Item arrow="horizontal"><i className="iconfont icon-tianchongxing-"></i> 在线客服</Item>
                        <Item arrow="horizontal" onClick={this.logforOut}><i className="iconfont icon-jinakangbaoicons02"></i> 退出登录</Item>
                    </List>
                </div>
            </div>
        )
    }
}