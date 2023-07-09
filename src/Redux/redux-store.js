import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";  //можно просто thunk вместо thunkMiddleware
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";

let reducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   sidebar: sidebarReducer,
   usersPage: usersReducer,
   auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //это включает расширение для хрома для redux

let store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));  //можно просто thunk вместо thunkMiddleware

export default store;
window.store = store;