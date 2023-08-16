import { Formik } from "formik";
import styles from '../common/FormsControl/FormsControl.module.css'
import {  validationLogin } from "../../utils/validators/validator";


const LoginForm = () => {

   let maxLength = 4;
   let newValue = `login`;
   let validationPassword = `password`;

   return (
   <div>
      <Formik
         initialValues={{
            login: '',
            password: '',
            checkbox: '',
         }}
         validate={(values) => validationLogin(values, maxLength, newValue, validationPassword)}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
      >

         {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
               <p className={errors.login && touched.login
                     ? styles.formControl + ' ' + styles.error
                     : ''}>
               <input
                  type="text"
                  name="login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  placeholder="Login"
               />
               </p>

               <div className={styles.formControl + ' ' + styles.error}>
                     {errors.login && touched.login && errors.login}
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
                  name="checkbox"
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