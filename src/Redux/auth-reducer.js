import { authAPI } from "../api/api";

const SET_AUTH_USER_DATA = 'SET_AUTH_USER_DATA';


let initialState = {
   userId: null,
   login: null,
   email: null,
   isAuth: false
}

const authReducer = (state = initialState, action) => {
   switch (action.type) {

      case SET_AUTH_USER_DATA:
         //debugger;
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

export const getAuthUserData = () => (dispatch) => {
   return authAPI.me()  // return, т.к. dispatch(getAuthUserData()) должен вернуть нам промис
      .then(response => {
         //if (data.resultCode === 0) {  //вместо response.data просто data
         if (response.data.resultCode === 0) {
            //let { id, login, email } = data.data;  //вместо response.data.data просто data.data
            let { id, login, email } = response.data.data;
            dispatch(setAuthUserData(id, login, email, true)) //очередность как в actionCreator setAuthUserData
         }
      })
}


export const login = (email, password, rememberMe, setStatus, setSubmitting) => (dispatch) => { //это thunkCreator для логинизации
   authAPI.login(email, password, rememberMe)  //здесь отдельный экземпляр axios для .post
      .then(response => {
         if (response.data.resultCode === 0) {  //если все хорошо (мы залогинились) - 
            dispatch( getAuthUserData() ) //опять запрашиваем запрос на аутентификацию, чтобы прошел поток получения информации обо мне
         } else {
            let message = response.data.messages.length > 0 //проверка если messages пустой
                           ? response.data.messages[0]
                           : 'Some error';
            setStatus(message);
         };
         setSubmitting(false);
      });
}

export const logout = () => (dispatch) => { //это thunkCreator для вылогинизации
   authAPI.logout()  //здесь отдельный экземпляр axios для .post
      .then(response => {
         if (response.data.resultCode === 0) {
            dispatch( setAuthUserData(null, null, null, false) ) //обнулили все при вылогинизации
         }
      });
}


export default authReducer;