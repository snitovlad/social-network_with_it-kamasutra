import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';


let initialState = {
   initialized: false,
   globalError: null
}

const appReducer = (state = initialState, action) => {
   switch (action.type) {

      case INITIALIZED_SUCCESS:
         return {
            ...state,
            initialized: true
         };
      case SET_GLOBAL_ERROR:
         return {
            ...state,
            globalError: action.globalError
         };
      default:
         return state;
   }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });
export const setGlobalError = (globalError) => ({ type: SET_GLOBAL_ERROR, globalError })

export const initializeApp = () => (dispatch) => {
   let promise = dispatch(getAuthUserData()); //это dispatch асинхронной операции. Сюда получим promise
   /*promise.then(() => {   //это случай, когда есть одна асинхронная операция
      dispatch(initializedSuccess())
   })*/
   Promise.all([promise])   //это случай, когда несколько асинхронных операций. Они перечисляются в массиве.
      .then(() => {     //then выполнится, когда завершатся все асинхронные операции. Берется then у all
         dispatch(initializedSuccess())
      })
}

export const showGlobalError = (globalError) => (dispatch) => {
   dispatch(setGlobalError(globalError));
   setTimeout(() => dispatch(setGlobalError(null)), 5000)
}

export default appReducer;