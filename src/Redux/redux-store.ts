import { applyMiddleware, combineReducers, legacy_createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";  //можно просто thunk вместо thunkMiddleware
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

let rootReducers = combineReducers({
   profilePage: profileReducer,
   dialogsPage: dialogsReducer,
   sidebar: sidebarReducer,
   usersPage: usersReducer,
   auth: authReducer,
   app: appReducer
})

type RootReducersType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducersType>; //вычленили тип AppStateType из типа RootReducersType

//@ts-ignore 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; //это включает расширение для хрома для redux

let store = legacy_createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)));  //можно просто thunk вместо thunkMiddleware

export default store;

//@ts-ignore чтобы компилятор TypeScript игнорировал строку ниже
window.store = store;