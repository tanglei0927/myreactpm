import { Lunbo } from "../../components/swipe";
import "./index.less"

export class Home extends Component{
    state={
        bf:false
    }

    checkbf=()=>{
        var bfBtn=document.getElementsByClassName("aduio")[0];
        if(this.state.bf){
            //暂停
            bfBtn.pause();
            this.setState({
                bf:false
            })
        }else{
            //播放
            bfBtn.play();
            this.setState({
                bf:true
            })
        }

    }


    render(){
        const {
            bf
        }=this.state
        console.log(this.state)
        return (
            <div>
               <Lunbo />
               <div className="vediobox">
                   <i onClick={this.checkbf} className={bf?"iconfont icon-bofang1":"iconfont icon-bofang"}></i>
                   <audio controls="controls" style={{width:"1rem"}} className="aduio">
                       {/* duration:时长 */}
                         <source src="http://47.102.144.31:1901/music/qinyinyue1.mp3" type="audio/mp3" />
                    </audio> 
               </div>
            </div>
        )
    }
}