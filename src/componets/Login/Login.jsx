import React from 'react';
import LoginForm from './LoginForm';
import { login } from '../../Redux/auth-reducer';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
import s from './Login.module.css'

const Login = (props) => {

   const submit = (values, { setSubmitting, setStatus }) => {
      props.login(values.email, values.password, values.rememberMe, values.captcha, setStatus, setSubmitting);
      setSubmitting(false);
   }

   if (props.isAuth) {
      return <Navigate to = {'/profile'} />
   }
   return <div className={s.login}>
      <h1>LOGIN</h1>
      <LoginForm submit={submit} errorMessage={props.errorMessage} captchaUrl={props.captchaUrl}/>
   </div>
}

const mapStateToProps = (state) => ({
   isAuth: state.auth.isAuth,
   errorMessage: state.auth.errorMessage,
   captchaUrl: state.auth.captchaUrl
})

export default connect(mapStateToProps, { login })(Login);


