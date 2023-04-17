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

const Dialogs = (props) => {

   let dialogs = [
      {id: 1, name: 'Dimych'},
      {id: 2, name: "Andrey"},
      {id: 3, name: "Sveta"},
      {id: 4, name: "Sasha"},
      {id: 5, name: "Victor"},
      {id: 6, name: "Valera"}
   ];

   let messages = [
      {id: 1, message: 'Hi!'},
      {id: 2, message: 'How is your it-kamasutra?'},
      {id: 3, message: 'Yo!'},
      {id: 4, message: 'Yo!'},
      {id: 5, message: 'Yo!'}
   ]

   let dialogsElement = dialogs.map( dial => <DialogItem id={dial.id} name={dial.name} />)
   let messagesElement = messages.map( mess => <Message id={mess.id} message={mess.message} />)

   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            { dialogsElement }
         </div>
         <div className={s.messages}>
            { messagesElement }
         </div>

      </div>
   );
}

export default Dialogs;