import {render} from "react-dom"
import {Provider} from "react-redux"
import { Index } from "./views";
import store from './store'

const hotRender=()=>{
    render(
        <Provider store={store}>
            <Index />
        </Provider>,
        document.getElementById("app")
    )
}
hotRender();