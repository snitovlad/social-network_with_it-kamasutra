import { Formik } from 'formik';
import {  validation } from '../../../../utils/validators/validator';
import styles from '../../../common/FormsControl/FormsControl.module.css'


//let maxLength5 = (values) => { maxLengthCreator(5) };


const AddNewPostForm = (props) => {

   let maxLength = 50;
   let newValue = `newPostText`;

   let onAddPost = (values, { setSubmitting }) => {
      props.addPost(values.newPostText);
      setTimeout(() => {
         values.newPostText = ""; //очистили форму ввода через 400мс
         setSubmitting(false); //это активация кнопки после нажатия через 400мс
      }, 400);
   }

   return (
      <div>
         <Formik
            initialValues={{ newPostText: '' }}
            validate={(values) => validation(values, maxLength, newValue)}
            onSubmit={onAddPost}
         >
            {({
               values,
               errors,
               touched,
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
            }) => (
               <form onSubmit={handleSubmit}>
                  <div className={errors.newPostText && touched.newPostText
                     ? styles.formControl + ' ' + styles.error
                     : ''}>
                     <textarea
                        type="text"
                        name="newPostText"
                        placeholder="Post message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPostText}
                        rows='3'
                        cols='30'
                     />
                  </div>
                  <div className={styles.formControl + ' ' + styles.error}>
                     {errors.newPostText && touched.newPostText && errors.newPostText}
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                     Add post
                  </button>
               </form>
            )}
         </Formik>
      </div>
   )
}

export default AddNewPostForm;