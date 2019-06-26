import "./index.less"

let timer=null;

export class Bbs extends Component{
    state={
        ids:"change"
    }

    changeyue=()=>{
        clearInterval(timer);
        timer=setInterval(() => {
            if(this.state.ids=="change"){
                this.setState({
                    ids:"changebig"
                })
            }else{
                this.setState({
                    ids:"change"
                })
            }
        }, 2000);
    }

    componentDidMount(){
        this.changeyue();
        
    }
    render(){
        const{
            ids
        }=this.state
        return (
            <div className="bbspage">
               <img src="http://47.102.144.31:1901/images/shuim/yehuabj.jpg" alt=""/>
               <div className="clickbox">
                    <div className="yueliang" id={ids}>
                        <img src="http://47.102.144.31:1901/images/shuim/yueliang.png" alt=""/>
                    </div>
               </div>
            </div>
        )
    }
}