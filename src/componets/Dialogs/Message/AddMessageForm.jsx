import { Formik } from 'formik';
import { validation } from '../../../utils/validators/validator';
import styles from '../../common/FormsControl/FormsControl.module.css'



const AddMessageForm = (props) => {

   let maxLength = 8;
   let newValue = `newMessageBody`;

   let addNewMessage = (values, { setSubmitting }) => {
      props.sendMessage(values.newMessageBody);
      setTimeout(() => {
         values.newMessageBody = ""; //очистили форму ввода через 400мс
         setSubmitting(false); //это активация кнопки после нажатия через 400мс
      }, 400);
   }

   return (
      <div>
         <Formik
            initialValues={{ newMessageBody: '' }}
            validate={(values) => validation(values, maxLength, newValue)}
            onSubmit={addNewMessage}
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
                  <div className={errors.newMessageBody && touched.newMessageBody
                     ? styles.formControl + ' ' + styles.error
                     : ''}>
                     <textarea
                        type="text"
                        name="newMessageBody"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newMessageBody}
                        rows='3'
                        cols='30'
                     />
                  </div>
                  <div className={styles.formControl + ' ' + styles.error}>
                     {errors.newMessageBody && touched.newMessageBody && errors.newMessageBody}
                  </div>
                  <button type="submit" disabled={isSubmitting}>
                     Send
                  </button>
               </form>
            )}
         </Formik>
      </div>
   )
}

export default AddMessageForm;