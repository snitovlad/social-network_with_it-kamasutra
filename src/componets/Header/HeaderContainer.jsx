import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from '../../Redux/auth-reducer'

class HeaderContainer extends React.Component {

   render() {
      return <Header {...this.props} />
   }
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login
});

export default connect(mapStateToProps, { logout })(HeaderContainer);

//axios.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {withCredentials: true}) //т.к. кроссдоменный запрос
