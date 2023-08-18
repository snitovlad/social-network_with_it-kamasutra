import React from 'react';
import LoginForm from './LoginForm';
import { login } from '../../Redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';


const Login = (props) => {

   const submit = (values, { setSubmitting }) => {
      props.login(values.email, values.password, values.rememberMe);
      setSubmitting(false);
   }

   if (props.isAuth) {
      return <Navigate to = {'/profile'} />
   }
   return <div>
      <h1>LOGIN</h1>
      <LoginForm submit={submit} />
   </div>
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, { login })(Login);


