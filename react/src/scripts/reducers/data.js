import {GETMUSIC} from "../actions"

const defaultData={
    musicData:[]
}

export default (state=defaultData,actions)=>{
    switch(actions.type){
        case GETMUSIC:
            return {...state,...{musicData:actions.musicData.result}}
            break;
        default:
            return state;
            break;
    }
}
