import { configureStore , combineReducers} from "@reduxjs/toolkit";
import chatSlice from "./chatSlice";
import { userReducer } from "./userReducer";

const reducer = combineReducers({
    user:userReducer.reducer,
    chat:chatSlice
})
const store = configureStore({
    reducer
})

export default store