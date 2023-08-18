import { Formik } from "formik";
import styles from '../common/FormsControl/FormsControl.module.css'
import {  validationLogin } from "../../utils/validators/validator";


const LoginForm = (props) => {

   let maxLength = 20;
   let newValue = `email`;
   let validationPassword = `password`;

   /*const submit = (values, { setSubmitting }) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        setSubmitting(false);
      }, 400);
    }*/

   return (
   <div>
      <Formik
         initialValues={{
            email: '',
            password: '',
            rememberMe: '',
         }}
         validate={(values) => validationLogin(values, maxLength, newValue, validationPassword)}
         /*onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}*/
          onSubmit={props.submit}
      >

         {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
               <p className={errors.email && touched.email
                     ? styles.formControl + ' ' + styles.error
                     : ''}>
               <input
                  type="text"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  placeholder="Email"
               />
               </p>

               <div className={styles.formControl + ' ' + styles.error}>
                     {errors.email && touched.email && errors.email}
                  </div>

               <p className={errors.password && touched.password
                     ? styles.formControl + ' ' + styles.error
                     : ''}>
               <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
               />
               </p>

               <div className={styles.formControl + ' ' + styles.error}>
                     {errors.password && touched.password && errors.password}
                  </div>

               <p>
               <input
                  type="checkbox"
                  name="rememberMe"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.checkbox}
               /> remember me
               </p>

               <button type="submit" disabled={isSubmitting}>
                  Submit
               </button>
            </form>
         )
         }
      </Formik>
   </div>
   )}

   export default LoginForm;