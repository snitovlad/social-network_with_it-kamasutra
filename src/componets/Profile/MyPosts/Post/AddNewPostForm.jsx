import { Formik } from 'formik';

const AddNewPostForm = (props) => {

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
            onSubmit={onAddPost}
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
                        name="newPostText"
                        placeholder="Enter your message"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.newPostText}
                        rows='3'
                        cols='30'
                     />
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