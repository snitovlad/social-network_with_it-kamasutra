import { Form, Formik } from "formik";
import * as Yup from 'yup';
import { MyCheckbox, MyTextInput } from "../common/FormsControl/FormsControl";
import s from './Login.module.css'

const LoginForm = (props) => {

   /*const submit = (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }*/

   return (
      <div className={s.loginForm}>
         <Formik
            initialValues={{
               email: '',
               password: '',
               rememberMe: '',
               captcha: ''
            }}

            validationSchema={Yup.object({
               email: Yup.string()
                  .email('Invalid email address')
                  .required('Required'),
               password: Yup.string()
                  .max(15, 'Must be 15 characters or less')
                  .required('Required'),
               rememberMe: Yup.boolean()
                       .required('Required')
                       .oneOf([true], 'You must accept "remember me".')
            })}

            onSubmit={props.submit}
         >

            <Form className={s.addFormav}>

               <div>
                  <MyTextInput label="Email" name="email" type="email" placeholder="Email" />
               </div>
               <div>
                  <MyTextInput label="Password" name="password" type="password" placeholder="Password" />
               </div>
               <div>
               <MyCheckbox name="rememberMe" >remember me</MyCheckbox>
               </div> 

               {!props.captchaUrl            
                ? (props.errorMessage ? <div className={s.error}>{props.errorMessage}</div> : null)
                : null}

               <div>{props.captchaUrl && <img src={props.captchaUrl} />} </div>

               {props.captchaUrl && 
               <div>
                  <MyTextInput label="Input symbols from image" name="captcha" type="text" placeholder="symbols from image" />
               </div>
}
               <button type="submit" disabled={props.isSubmitting}>Submit</button>
              
            </Form>
            
         </Formik>
      </div >
   )
}

export default LoginForm;