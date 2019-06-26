import { checkNew } from "../../actions";
import {connect} from "react-redux";
import './index.less'
@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            getlist:()=>dispatch(checkNew())
        }
    }
)
export class List extends Component{
    componentDidMount(){
        if(this.props.data.newsData.length==0){
            this.props.getlist();
        }
       
    }
    render(){
        console.log("list")
        console.log(this.props)
        const {
            data:{
                newsData
            }
        }=this.props;
        return(
            <div className="newsbox">
              
                {
                    newsData.map((news,i)=>{
                        return(                                                     
                            <div key={i} className="newslist">
                                 <a href={news.url}> 
                                <img src={news.picUrl} alt=""/>
                                <p>{news.title}</p>
                                <p>
                                    <span className="laiyuan">{news.description}</span>
                                    <span className="time">{news.ctime}</span>
                                </p>
                                </a> 
                            </div>
                          
                        )
                    })
                   
                }               
            </div>
        )
    }
}