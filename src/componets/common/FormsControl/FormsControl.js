import { useField } from 'formik';
import s from './FormsControl.module.css'

export const MyTextInput = ({ label, ...props }) => {
   // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
   // which we can spread on <input>. We can use field meta to show an error
   // message if the field is invalid and it has been touched (i.e. visited)
   const [field, meta] = useField(props);
   return (
      <>
         <label htmlFor={props.id || props.name}>{label}</label>
         <input className="text-input" {...field} {...props} />
         {meta.touched && meta.error ? (
            <div className={s.error}>{meta.error}</div>
         ) : null}
      </>
   );
};

export const MyTextarea = ({ label, ...props }) => {
   const [field, meta] = useField(props);
   return (
      <>
         <label htmlFor={props.id || props.name}>{label}</label>
         <textarea className="text-area" {...field} {...props} />
         {meta.touched && meta.error ? (
            <div className={s.error}>{meta.error}</div>
         ) : null}
      </>
   );
};

export const MyCheckbox = ({ children, ...props }) => {
   // React treats radios and checkbox inputs differently from other input types: select and textarea.
   // Formik does this too! When you specify `type` to useField(), it will
   // return the correct bag of props for you -- a `checked` prop will be included
   // in `field` alongside `name`, `value`, `onChange`, and `onBlur`
   const [field, meta] = useField({ ...props, type: 'checkbox' });
   return (
      <div>
         <label className="checkbox-input">
            <input type="checkbox" {...field} {...props} />
            {children}
         </label>
         {meta.touched && meta.error ? (
            <div className={s.error}>{meta.error}</div>
         ) : null}
      </div>
   );
};

