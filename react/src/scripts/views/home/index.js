import { Lunbo } from "../../components/swipe";
import "./index.less"

let timer=null;


export class Home extends Component{
    state={
        bf:false,
        timeLong:44,
        count:59
    }

      //倒计时  根据模式
    // var timer=null;
   timergo(){
        clearInterval(timer);
        timer= setInterval(()=>{
               this.setState({
                   count:--this.state.count
               })
            // count++
            if(this.state.count==0){
                // count=0;
                this.setState({
                    timeLong:--this.state.timeLong,
                    count:59
                })
                if(this.state.timeLong==0){
                    clearInterval(timer);

                }
            }
        },1000)
    }
      

    checkbf=()=>{
        var bfBtn=document.getElementsByClassName("aduio")[0];
        if(this.state.bf){
            //暂停
            bfBtn.pause();
            this.setState({
                bf:false
            })
            clearInterval(timer);
        }else{
            //播放
            bfBtn.play();
            this.setState({
                bf:true
            })
            this.timergo();
        }
      
    }


    render(){
        const {
            bf,
            timeLong,
            count
        }=this.state
        console.log(this.state)
        return (
            <div>
               <Lunbo />
               <div className="vediobox">
                  <span className="timebox">{timeLong}:{count}</span>
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