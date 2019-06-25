import {Route,Switch,Redirect} from "react-router-dom"
import { Foot } from "../../components/foot";
import { Home } from "../home";
import { Good } from "../good";
import { Bbs } from "../bbs";
import { Manyou } from "../manyou";
import { My } from "../my";

export class App extends Component{
    
    render(){
        
        console.log(this.props)
        console.log("首页-----路由")    
        
        return(
            <div>
                <div>
                    <Switch>
                        <Route path="/app/home" component={Home} />
                        <Route path="/app/good" component={Good}/>
                        <Route path="/app/bbs" component={Bbs} />
                        <Route path="/app/manyou" component={Manyou} />
                        <Route path="/app/my" component={My} />
                        <Route path="/app/" exact render={()=>(<Redirect to="/app/home" />)} />
                    </Switch>
                </div>
                <Foot url={this.props.location.pathname}/>
            </div>
        )
    }
}