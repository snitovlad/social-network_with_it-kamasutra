import { ThunkAction } from "redux-thunk";
import { ResultCodeForCaptchaEnum, ResultCodesEnum, authAPI, securityAPI } from "../api/api";
import { AppStateType } from "./redux-store";
import { Dispatch } from "redux";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const GET_LOGIN_ERROR_FROM_API = 'login/GET_LOGIN_ERROR_FROM_API';

type InitialStateType = typeof initialState;

let initialState = {
   userId: null as number | null,
   login: null as string | null,
   email: null as string | null,
   isAuth: false,
   errorMessage: null as string | null,
   captchaUrl: null as string | null
}

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
   switch (action.type) {

      case SET_AUTH_USER_DATA:
      case GET_CAPTCHA_URL_SUCCESS:
      case GET_LOGIN_ERROR_FROM_API:
         return {
            ...state,
            ...action.payload  //нужен ли ...
         };

      default:
         return state;
   }
};

type ActionsTypes = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | GetLoginErrorFromApiActionType

type SetAuthUserDataActionPayloadType = {
   userId: number | null
   login: string | null
   email: string | null
   isAuth: boolean
}
type SetAuthUserDataActionType = {
   type: typeof SET_AUTH_USER_DATA
   payload: SetAuthUserDataActionPayloadType
}
const setAuthUserData = (userId: number | null, login: string | null, email: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
   type: SET_AUTH_USER_DATA,
   payload: { userId, login, email, isAuth }
});

type GetCaptchaUrlSuccessActionType = {
   type: typeof GET_CAPTCHA_URL_SUCCESS
   payload: { captchaUrl: string | null }
}
const getCaptchaUrlSuccess = (captchaUrl: string | null): GetCaptchaUrlSuccessActionType => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: { captchaUrl }
})

type GetLoginErrorFromApiActionType = {
   type: typeof GET_LOGIN_ERROR_FROM_API
   payload: { errorMessage: string | null }
}
const getLoginErrorFromApi = (errorMessage: string | null): GetLoginErrorFromApiActionType => ({
   type: GET_LOGIN_ERROR_FROM_API,
   payload: { errorMessage }
})

//было
// export const getAuthUserData = () => (dispatch) => {
//    return authAPI.me()  // return, т.к. dispatch(getAuthUserData()) должен вернуть нам промис
//       .then(response => {
//          //if (data.resultCode === 0) {  //вместо response.data просто data
//          if (response.data.resultCode === 0) {
//             //let { id, login, email } = data.data;  //вместо response.data.data просто data.data
//             let { id, login, email } = response.data.data;
//             dispatch(setAuthUserData(id, login, email, true)) //очередность как в actionCreator setAuthUserData
//          }
//       })
// }


type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes> //типизация thunk из redux


//стало c async await
export const getAuthUserData = (): ThunkType => async (dispatch) => {
   const meData = await authAPI.me()
   if (meData.resultCode === ResultCodesEnum.Success) {
      let { id, login, email } = meData.data;
      dispatch(setAuthUserData(id, login, email, true)) //очередность как в actionCreator setAuthUserData
   }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha: string,
   setStatus: any, setSubmitting: any): ThunkType => async (dispatch) => { //это thunkCreator для логинизации
      const loginData = await authAPI.login(email, password, rememberMe, captcha)  //здесь отдельный экземпляр axios для .post
      if (loginData.resultCode === ResultCodesEnum.Success) {  //если все хорошо (мы залогинились) - 
         dispatch(getAuthUserData()) //опять запрашиваем запрос на аутентификацию, чтобы прошел поток получения информации обо мне
         dispatch(getLoginErrorFromApi(null)) //обнуляем ошибку с сервера
         dispatch(getCaptchaUrlSuccess(null)) //обнуляем url капчи
      } else {
         if (loginData.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) { //если пришла ошибка 10, то выведем капчу
            dispatch(getCaptchaUrl());
         }
         // let message = response.data.messages.length > 0 //проверка если messages пустой
         //    ? response.data.messages[0]
         //    : 'Some error';
         // setStatus(message); эта штука как-то не работает

         dispatch(getLoginErrorFromApi(loginData.messages[0]))
      };
      setSubmitting(false);
   }

export const getCaptchaUrl = (): ThunkType => async (dispatch) => { //это thunkCreator для логинизации
   const response = await securityAPI.getCaptchaUrl()  //здесь отдельный экземпляр axios для .post
   const captchaUrl = response.data.url;
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = (): ThunkType => async (dispatch) => { //это thunkCreator для вылогинизации
   const logoutData = await authAPI.logout()  //здесь отдельный экземпляр axios для .post
   if (logoutData.resultCode === ResultCodesEnum.Success) {
      dispatch(setAuthUserData(null, null, null, false)) //обнулили все при вылогинизации
   }
}


export default authReducer;