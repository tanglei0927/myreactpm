import {HashRouter as Router,Route,Switch,Redirect} from "react-router-dom"

import {connect} from "react-redux"
import { changeLogin } from "../actions";
import { Welcome } from "./welcome";
import { Guide } from "./guide";
import { Login } from "./login";
import {App} from "./app"

@connect(
    state=>{
        return{
            ...state
        }
    },
    dispatch=>{
        return{
            changelogin:()=>dispatch(changeLogin(username))
        }
    }
)
export class Index extends Component{
    render(){       
        console.log(this.props)
        console.log("项目主路由")
        // console.log(loginstate)
        return(
            <Router>
                <Switch>
                    <Route path="/welcom" component={Welcome} />
                    <Route path="/guide" component={Guide}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/app" component={App} />
                    <Route path="/" component={()=>(<Redirect to="welcom" />)}  />
                    
                </Switch>
            </Router>
        )
    }
}