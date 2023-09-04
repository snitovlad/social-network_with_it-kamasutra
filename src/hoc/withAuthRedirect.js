import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "./withRouter";

let mapStateToPropsForRedirect = (state) => ({
   isAuth: state.auth.isAuth
})
export const withAuthRedirect = (Component) => {

   class RedirectComponent extends React.Component {  //можно сделать и через функциональную компоненту

      render() {
         //если нет Id в строке браузера, то нет и авторизации - тогда редирект на /login
         if (this.props.router) {
            //если нет аутентификации и нет приходящего значения Id из URL, то редирект на /login 
            if (!this.props.isAuth && !this.props.router.params.userId) return <Navigate to='/login' />
            return <Component {...this.props} />
         }
         return <Navigate to='/login' />

         // if (!this.props.isAuth) return <Navigate to='/login' />  //делаем редирект страницы при отсутствии аутентификации
         //return <Component {...this.props} />
      }
   }

   return compose(
      withRouter, //тогда не нужен withRouter в UsersContainer, DialogsContainer, ProfileContainer
      connect(mapStateToPropsForRedirect))(RedirectComponent); //законнектили RedirectComponent
   //т.е. прокинули mapStateToPropsForRedirect через props в RedirectComponent

}
