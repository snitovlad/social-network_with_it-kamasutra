import { Formik } from 'formik';

const AddMessageForm = (props) => {

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
            onSubmit={addNewMessage}
         >
            {({
               values,               
               handleChange,
               handleBlur,
               handleSubmit,
               isSubmitting,
            }) => (
               <form onSubmit={handleSubmit}>
                  <div>
                     <textarea
                        type="text"
                        name="newMessageBody"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newMessageBody}
                     />
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