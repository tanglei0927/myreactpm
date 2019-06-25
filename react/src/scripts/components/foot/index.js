export const foots=[
    {txt:"哄我睡",path:"/app/home",name:"home",icon:"icon-yueguang"},
    {txt:"睡更好",path:"/app/good",name:"good",icon:"icon-shuijue"},
    {txt:"夜话",path:"/app/bbs",name:"bbs",icon:"icon-xinxi"},
    {txt:"漫游",path:"/app/manyou",name:"manyou",icon:"icon-iconset0456"},
    {txt:"我的",path:"/app/my",name:"my",icon:"icon-my_icon"}
]

import './index.less'

import {NavLink} from "react-router-dom"

// export const Foot=()=>{
    
//     return(
//         <footer>
//             {
//                 foots.map((item,i)=>{
//                     return(
//                         <div key={i}>
//                             <NavLink to={item.path} activeClassName="active">
//                                 <i className={"iconfont "+item.icon}></i>
//                                 <span>{item.txt}</span>
//                             </NavLink>
//                         </div>
//                     )
//                 })
//             }
//         </footer>
//     )
// }

export class Foot extends Component{
    render(){
        const {
            url
        }=this.props
        console.log("hhhhhhh")
        console.log(this.props)
        return(
            <footer className={url=="/app/home"?"activehome":""}>
                    {
                    foots.map((item,i)=>{
                        return(
                            <div key={i}>
                                <NavLink to={item.path} activeClassName="active">
                                    <i className={"iconfont "+item.icon}></i>
                                    <span>{item.txt}</span>
                                </NavLink>
                            </div>
                        )
                    })
                }
            </footer>
        )
        
    }
}
