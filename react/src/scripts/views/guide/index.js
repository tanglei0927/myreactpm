import {connect} from "react-redux"
import { changeLogin } from "../../actions";
import "./index.less"
// import imgurl from "@/assets/images/welcome.jpg"
import history from "history"




const bjs=[
    {imgurl:"http://47.102.144.31:1901/images/shuim/guide1.jpg"},
    {imgurl:"http://47.102.144.31:1901/images/shuim/guide2.jpg"},
    {imgurl:"http://47.102.144.31:1901/images/shuim/guide3.jpg"},
    {imgurl:"http://47.102.144.31:1901/images/shuim/guide4.jpg"}
]


@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            // changelogin:()=>dispatch(changeLogin(username))
        }
    }
)
export class Guide extends Component{

    componentDidMount(){
        var mySwiper =new Swiper(".swiper-container",{
            direction:"horizontal",            
        })
    }

    goLogin(i){
        // console.log(i)
        if(i==bjs.length-1){
            // alert("6666666")
            // console.log(this.props.history)
            this.props.history.push("/login")
        }
       
    }

    render(){
      
        return(
           
            <div className="swiper-container" style={{height:'100%',width:'100%'}} >
                <div className="swiper-wrapper">
                    {
                        bjs.map((bj,i)=>{
                            return (
                                <div className="swiper-slide" key={i} onClick={()=>this.goLogin(i)}>
                                    <img src={bj.imgurl} alt="" style={{height:'100%',width:"100%"}}/>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
          
           
           
        )
    }
}