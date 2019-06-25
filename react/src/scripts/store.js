import {createStore,applyMiddleware} from 'redux'
import {reducers} from './reducers'

// const store=createStore(reducers)
import thunk from "redux-thunk";
import promise from "redux-promise"

const store=createStore(reducers,applyMiddleware(thunk,promise));

export default store;