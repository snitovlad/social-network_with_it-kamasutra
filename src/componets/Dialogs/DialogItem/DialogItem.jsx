import { NavLink } from 'react-router-dom';
import s from './../Dialogs.module.css'

const DialogItem = (props) => {
   let path = "/dialogs/" + props.id;
   return (
      <div className={s.dialog}>
         <NavLink to={path}>{props.name}</NavLink> {/*вместо {"/dialogs/" + props.id} можно "/dialogs/${props.id}" */}
      </div>
   )
}

export default DialogItem;