import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import s from './ProfileInfo.module.css'
import { MyCheckbox, MyTextInput, MyTextarea } from '../../common/FormsControl/FormsControl';

//компонент для формы в режиме редактирования профил
const ProfileDataForm = ({ profile, handleSubmit, isSubmitting, error }) => {

   //из сообщения об ошибке с сервера достаем название поля
   let errorField = null;
   if (error) {
      errorField = error.split("->");
      if (errorField != error) { //т.к. в некоторых полях нет "->"
         errorField = errorField[1].slice(0, errorField[1].length - 1)
         errorField = errorField.charAt(0).toLowerCase() + errorField.slice(1);
      }
   }

   return (
      <Formik
         initialValues={profile} //получаем инициализационные данные из profile
         validationSchema={Yup.object({
            fullName: Yup.string()
               .max(15, 'Must be 15 characters or less')
               .required('Required'),
            lookingForAJobDescription: Yup.string()
               .max(15, 'Must be 15 characters or less')
               .required('Required'),
            aboutMe: Yup.string()
               .max(15, 'Must be 15 characters or less')
               .required('Required')
         })}
         onSubmit={handleSubmit}
      >

         <Form className={s.addForm}>
            <div>
               <MyTextInput label="Full Name" name="fullName" type="text" placeholder="My full name" />
            </div>
            <div>
               <MyCheckbox name="lookingForAJob">Looking for a job</MyCheckbox>
            </div>
            <div>
               <MyTextarea label="My professional skills" name="lookingForAJobDescription"
                  type="text" placeholder="My professional skills" />
            </div>
            <div>
               <MyTextarea label="About me" name="aboutMe" type="text" placeholder="About me" />
            </div>

            <div className={s.contactsInFormBlock}>

               {/* пробежимся map-пом и отобразим контакты из вложенного объекта contacts */}
               <b className={s.contactsInForm}>Contacts:</b>
               {Object.keys(profile.contacts).map(key => {
                  return (
                     <div key={key} className={s.contact + ' ' + (key === errorField ? s.errorContacts : null)} >
                        <MyTextInput label={key + ":"} name={"contacts." + key} type="text" placeholder={key} />
                     </div>
                  )
               })}
            </div>

            {/* вставим описание ошибки, которое пришло с сервера */}
            {error ? <div className={s.error}>{error}</div> : null}
            
            <div><button type="submit" disabled={isSubmitting}>save</button></div>
         </Form>
      </Formik>
   )
}
export default ProfileDataForm;