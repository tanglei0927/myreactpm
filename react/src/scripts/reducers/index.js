import {combineReducers} from "redux"
import loginstate from "./loginstate"
import data from './data'

export const reducers=combineReducers({
    loginstate,
    data
})