import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

let mapStateToPropsForRedirect = (state) => ({
   isAuth: state.auth.isAuth
})

export const withAuthRedirect = (Component) => {

   class RedirectComponent extends React.Component {  //можно сделать и через функциональную компоненту
      render() {
         if (!this.props.isAuth) return <Navigate to='/login' />  //делаем редирект страницы при отсутствии аутентификации
         return <Component {...this.props} />
      }
   }
   
   let ConnectedAuthRedirectComponent = connect( mapStateToPropsForRedirect)(RedirectComponent);

   return ConnectedAuthRedirectComponent;
}