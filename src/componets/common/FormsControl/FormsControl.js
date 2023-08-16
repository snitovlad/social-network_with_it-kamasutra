import styles from './FormsControl.module.css'

export const Textarea = (props) => {
   return (
      <div>
      <div className={styles.formControl + ' ' + styles.error}>
         <textarea {...props} />
      </div>
      <span></span>

      </div>
   )
}