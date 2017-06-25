import {combineReducers} from "redux";


import weatherReducer from "./weatherReducer";
import infoReducer from "./infoReducer";

export default combineReducers({
	weatherReducer,
	infoReducer
});

