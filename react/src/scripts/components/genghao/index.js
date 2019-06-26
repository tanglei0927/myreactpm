import "./index.less"
import { Header } from "../header";
import { List } from "../list";
import { Datalist } from "../data";

export class MoreGood extends Component{
    render(){
        return(
            <div className="goodbox">
                <Header title="睡眠管家" />
                <img className="goodbjimg" src="http://47.102.144.31:1901/images/shuim/goodbj.jpg" alt=""/>
                  <div className="zouri">
                      <div className="msgs">
                          <p>昨日睡情</p>
                          <div>
                                <h2>优秀</h2>
                                <span>睡眠时段 23:01-07：01</span><br/>
                                <span>睡眠时长 8小时54分</span>
                          </div>
                         
                      </div>
                </div>
                <div className="datamsg">
                    数据分析
                    <Datalist />
                </div>
                <div className="news">
                    <h3>推荐阅读</h3>
                    <List/>
                </div>


            </div>
        )
    }
} 