import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import {  getAuthUserData, logout } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {
   componentDidMount() {
      this.props.getAuthUserData();
      /*usersAPI.getAuth()  //здесь отдельный экземпляр axios для .get
         .then(data => { //просто data вместо response, т.к. в promise вернули response.data (в api.js)
            //debugger;
            if (data.resultCode === 0) {  //вместо response.data просто data
               let { id, login, email } = data.data;  //вместо response.data.data просто data.data
               this.props.setAuthUserData(id, login, email) //очередность как в actionCreator
            }
         })*/
   }
   //debugger;

   render() {
      return <Header {...this.props} />
   }
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
});

export default connect(mapStateToProps, { getAuthUserData, logout })(HeaderContainer);

//axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}) //т.к. кроссдоменный запрос
