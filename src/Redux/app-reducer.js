import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';


let initialState = {
   initialized: false
}

const appReducer = (state = initialState, action) => {
   switch (action.type) {

      case INITIALIZED_SUCCESS:
         return {
            ...state,
            initialized: true
         };
      default:
         return state;
   }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
   let promise = dispatch(getAuthUserData()); //это dispatch асинхронной операции

   /*promise.then(() => {   //это случай, когда есть одна асинхронная операция
      dispatch(initializedSuccess())
   })*/

   Promise.all([promise])   //это случай, когда несколько асинхронных операций. Они перечисляются в массиве.
   .then(() => {     //then выполнится, когда завершатся все асинхронные операции. Берется then у all
      dispatch(initializedSuccess())
   })



}

export default appReducer;