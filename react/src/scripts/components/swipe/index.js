import history from "history"
import {connect} from "react-redux"
import {getMusic}  from "../../actions";
import "./index.less"
@connect(
    state=>{
        return {
            ...state
        }
    },
    dispatch=>{
        return {
            getlist:()=>dispatch(getMusic())
        }
    }
)
export class Lunbo extends Component{
    componentWillMount(){
       
    }

    cls(i){
        alert("6666666")
    }

    componentDidMount(){
        if(this.props.data.musicData.length==0){//避免多次请求
            this.props.getlist()
        }
        
        var mySwiper =new Swiper(".swiper-container",{
            loop:true,
            direction:"horizontal", 
            initialSlide :8,
            observe:true,
            effect : 'fade',
            fade: {
            crossFade: false,
            }         
        })
    }
    render(){
      console.log("swiper")
      console.log(this.props)
      const {
       data:{
        musicData
       }
      }=this.props
        return(
           
            <div className="swiper-container" style={{height:'100%',width:'100%'}} >
                <div className="swiper-wrapper">
                    {
                        musicData.map((bj,i)=>{
                            return (
                                <div className="swiper-slide" key={i} >
                                    <img src={bj.img} alt="" style={{height:'100vh',width:"100vm"}}/>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
          
           
           
        )
    }
}