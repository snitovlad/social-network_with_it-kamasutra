import { NavLink } from 'react-router-dom';
import s from './DialogItem.module.css'

const DialogItem = (props) => {
   let path = "/dialogs/" + props.id;
   return (
      <div className={s.dialog}>
         <img src={props.avatar} />
         <NavLink to={path} className={s.nameLink}>{props.name}</NavLink> {/*вместо {"/dialogs/" + props.id} можно "/dialogs/${props.id}" */}
      </div>
   )
}

export default DialogItem;