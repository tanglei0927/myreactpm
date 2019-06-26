import {GETMUSIC,CHECKNEWS} from "../actions"

const defaultData={
    musicData:[],
    newsData:[]
}

export default (state=defaultData,actions)=>{
    switch(actions.type){
        case GETMUSIC:
            return {...state,...{musicData:actions.musicData.result}}
            break;
        case CHECKNEWS:
            return {...state,...{newsData:actions.data.result}};
            break;
        default:
            return state;
            break;
    }
}
