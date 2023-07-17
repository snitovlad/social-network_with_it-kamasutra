import AddMessageForm from './Message/AddMessageForm';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import Message from './Message/Message';


const Dialogs = (props) => {

   let state = props.dialogsPage; //создали локальный state

   let dialogsElement = state.dialogs.map(dial => <DialogItem key={dial.id} id={dial.id} name={dial.name} avatar={dial.avatar} />)
   let messagesElement = state.messages.map(mess => <Message key={mess.id} id={mess.id} message={mess.message} />)

   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={s.messages}>
            <div>{messagesElement}</div>

            <AddMessageForm sendMessage={props.sendMessage}/>

         </div>

      </div>
   );
}




export default Dialogs;