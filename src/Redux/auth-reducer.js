import { authAPI, securityAPI } from "../api/api";

const SET_AUTH_USER_DATA = 'auth/SET_AUTH_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS';
const GET_LOGIN_ERROR_FROM_API = 'login/GET_LOGIN_ERROR_FROM_API';


let initialState = {
   userId: null,
   login: null,
   email: null,
   isAuth: false,
   errorMessage: null,
   captchaUrl: null
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {

      case SET_AUTH_USER_DATA: 
      case GET_CAPTCHA_URL_SUCCESS:         
      case GET_LOGIN_ERROR_FROM_API:         
         return {
            ...state,
            ...action.payload
         };

      default:
         return state;
   }
};

const setAuthUserData = (userId, login, email, isAuth) => ({
   type: SET_AUTH_USER_DATA,
   payload: { userId, login, email, isAuth }
});

const getCaptchaUrlSuccess = (captchaUrl) => ({
   type: GET_CAPTCHA_URL_SUCCESS,
   payload: {captchaUrl}
})

const getLoginErrorFromApi = (errorMessage) => ({
   type: GET_LOGIN_ERROR_FROM_API,
   payload: {errorMessage}
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

//стало c async await
export const getAuthUserData = () => async (dispatch) => {
   const response = await authAPI.me()
   if (response.data.resultCode === 0) {
      let { id, login, email } = response.data.data;
      dispatch(setAuthUserData(id, login, email, true)) //очередность как в actionCreator setAuthUserData
   }
}

export const login = (email, password, rememberMe, captcha, setStatus, setSubmitting) => async (dispatch) => { //это thunkCreator для логинизации
   const response = await authAPI.login(email, password, rememberMe, captcha)  //здесь отдельный экземпляр axios для .post
   if (response.data.resultCode === 0) {  //если все хорошо (мы залогинились) - 
      dispatch(getAuthUserData()) //опять запрашиваем запрос на аутентификацию, чтобы прошел поток получения информации обо мне
      dispatch(getLoginErrorFromApi(null)) //обнуляем ошибку с сервера
      dispatch(getCaptchaUrlSuccess(null)) //обнуляем url капчи
   } else {
      if (response.data.resultCode === 10) { //если пришла ошибка 10, то выведем капчу
         dispatch(getCaptchaUrl());
      }
      // let message = response.data.messages.length > 0 //проверка если messages пустой
      //    ? response.data.messages[0]
      //    : 'Some error';
      // setStatus(message); эта штука как-то не работает

      dispatch(getLoginErrorFromApi(response.data.messages[0]))
   };
   setSubmitting(false);
}

export const getCaptchaUrl = () => async (dispatch) => { //это thunkCreator для логинизации
   const response = await securityAPI.getCaptchaUrl()  //здесь отдельный экземпляр axios для .post
   const captchaUrl = response.data.url;
   dispatch(getCaptchaUrlSuccess(captchaUrl))
}

export const logout = () => async (dispatch) => { //это thunkCreator для вылогинизации
   const response = await authAPI.logout()  //здесь отдельный экземпляр axios для .post
   if (response.data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false)) //обнулили все при вылогинизации
   }
}


export default authReducer;