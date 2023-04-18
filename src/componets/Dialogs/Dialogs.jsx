import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import Message from './Message/Message';


const Dialogs = (props) => {

   {/*let dialogs = [
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
   ]*/}

   let dialogsElement = props.dialogs.map( dial => <DialogItem key={dial.id} id={dial.id} name={dial.name} />)
   let messagesElement = props.messages.map( mess => <Message key={mess.id} id={mess.id} message={mess.message} />)

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