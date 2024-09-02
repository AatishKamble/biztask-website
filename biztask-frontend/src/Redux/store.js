import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { thunk } from "redux-thunk";
import {authReducer} from "./Auth/Reducer.js";
import { businessReducer } from "./Business/Reducer.js";
import { serviceReducer } from "./ServiceR/Reducer.js";

const rootReducer=combineReducers({
        auth:authReducer,
        businessStore:businessReducer,
        serviceStore:serviceReducer,
        
  
});

export  const store=legacy_createStore(rootReducer,applyMiddleware(thunk));