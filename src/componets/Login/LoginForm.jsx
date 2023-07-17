import { Formik } from "formik";


const LoginForm = () => {
   return (
   <div>
      <Formik
         initialValues={{
            login: '',
            password: '',
            checkbox: '',
         }}
         onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
      >

         {({ values, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
            <form onSubmit={handleSubmit}>
               <p>
               <input
                  type="text"
                  name="login"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.login}
                  placeholder="Login"
               />
               </p>
               <p>
               <input
                  type="text"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Password"
               />
               </p>

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