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
            ...action.data,
            isAuth: true
         };
      default:
         return state;
   }
};

const setAuthUserData = (userId, login, email) => ({ type: SET_AUTH_USER_DATA, data: {userId, login, email} });

export const getAuthUserData = () => {
   return (dispatch) => {
      authAPI.me()  //здесь отдельный экземпляр axios для .get
         .then(data => { //просто data вместо response, т.к. в promise вернули response.data (в api.js)
            //debugger;
            if (data.resultCode === 0) {  //вместо response.data просто data
               let { id, login, email } = data.data;  //вместо response.data.data просто data.data
               dispatch(setAuthUserData(id, login, email)) //очередность как в actionCreator
            }
         })
   }
}

export default authReducer;