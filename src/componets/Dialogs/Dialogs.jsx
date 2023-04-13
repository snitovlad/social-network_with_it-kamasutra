import { NavLink } from 'react-router-dom';
import s from './Dialogs.module.css'

const DialogItem = (props) => {
   let path = "/dialogs/" + props.id;
   return (
      <div className={s.dialog}>
         <NavLink to={path}>{props.name}</NavLink> {/*вместо {"/dialogs/" + props.id} можно "/dialogs/${props.id}" */}
      </div>
   )
}

const Message = (props) => {
   return (
      <div className={s.message}>
         {props.message}
      </div>
   )
}

const Dialogs = () => {
   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            <DialogItem id="1" name="Dimych" />
            <DialogItem id="2" name="Andrey" />
            <DialogItem id="3" name="Sveta" />
            <DialogItem id="4" name="Sasha" />
            <DialogItem id="5" name="Victor" />
            <DialogItem id="6" name="Valera" />
         </div>
         <div className={s.messages}>
            <Message message="Hi!" />
            <Message message="How is your it-kamasutra?" />
            <Message message="Yo!" />
            <Message message="Yo!" />
            <Message message="Yo!" />
         </div>

      </div>
   );
}

export default Dialogs;