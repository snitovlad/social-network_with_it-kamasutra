import { getAuthUserData } from "./auth-reducer"

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';
const SET_GLOBAL_ERROR = 'SET_GLOBAL_ERROR';

type InitialStateType = typeof initialState;

let initialState = {
   initialized: false,
   globalError: null as string | null
}

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
   type: typeof INITIALIZED_SUCCESS  
}
export const initializedSuccess = (): InitializedSuccessActionType => ({ type: INITIALIZED_SUCCESS });

type SetGlobalErrorActionType = {
   type: typeof SET_GLOBAL_ERROR
   globalError: string | null 
}
export const setGlobalError = (globalError: string | null): SetGlobalErrorActionType => ({ type: SET_GLOBAL_ERROR, globalError });

export const initializeApp = () => (dispatch: any) => {
   let promise = dispatch(getAuthUserData()); //это dispatch асинхронной операции. Сюда получим promise
   /*promise.then(() => {   //это случай, когда есть одна асинхронная операция
      dispatch(initializedSuccess())
   })*/
   Promise.all([promise])   //это случай, когда несколько асинхронных операций. Они перечисляются в массиве.
      .then(() => {     //then выполнится, когда завершатся все асинхронные операции. Берется then у all
         dispatch(initializedSuccess())
      })
}

export const showGlobalError = (globalError: string ) => (dispatch: any) => {
   dispatch(setGlobalError(globalError));
   setTimeout(() => dispatch(setGlobalError(null)), 5000)
}

export default appReducer;