import {Switch,Route,Redirect,NavLink} from "react-router-dom"
import { Pwd } from "../../components/login/pwd";
import {Yanz} from "../../components/login/yanz";
import "./index.less"
import { NavBar, Icon } from 'antd-mobile';

export class Login extends Component{

    
    


    render(){
        return(
            <div className="loginpage">
                <NavBar
                    mode="light"
                    icon={<Icon type="left" style={{color:'#666'}} />}     
                    
                            
                ></NavBar>
                <ul>
                    <li>
                        <NavLink activeClassName="active" to="/login/pwd">密码登录</NavLink>
                    </li>
                    <li>
                        <NavLink activeClassName="active" to="/login/yanz">验证码登录</NavLink>
                    </li>
                </ul>
                <div style={{padding:20}}>
                    <Switch>
                        <Route path="/login/pwd" component={Pwd}/>
                        <Route path="/login/yanz" component={Yanz}/>
                        <Route path="/login/" exact render={()=>(<Redirect to="/login/pwd" />) }/>
                    </Switch>
                </div>
                <p className="gohome"><NavLink to="/app/">暂时不登录，先去看看</NavLink></p>
                <div className="loginmore">
                    <h3>第三方登录</h3>
                    <ul>
                        <li>
                            <i className="iconfont icon-qq"></i>
                        </li>
                        <li style={{borderLeft:"1px solid #999",borderRight:"1px solid #999"}}>
                             <i className="iconfont icon-weixin" ></i>
                        </li>
                        <li>
                            <i className="iconfont icon-weibo" ></i>
                        </li>
                    </ul>
                </div>

            </div>
        )
    }
}