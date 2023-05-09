import { createRef } from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import Message from './Message/Message';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../Redux/state';


const Dialogs = (props) => {

   let state = props.store.getState().dialogsPage; //создали локальный state


   let dialogsElement = state.dialogs.map(dial => <DialogItem key={dial.id} id={dial.id} name={dial.name} avatar={dial.avatar} />)
   let messagesElement = state.messages.map(mess => <Message key={mess.id} id={mess.id} message={mess.message} />)

   //let newMessageElement = createRef(); будем избегать использовать ref

   let onSendMessageClick = () => {
      //let text = newMessageElement.current.value;      так было с ref
      props.store.dispatch(sendMessageCreator())
   }

   let newMessageBody = state.newMessageBody; //наше значение для value

   let onNewMessageChange = (event) => {
      let body = event.target.value;  //событие event произошло с объектом target (это наш textarea) и берем у него value
      props.store.dispatch(updateNewMessageBodyCreator(body));
   }


   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            {dialogsElement}
         </div>

         <div className={s.messages}>
            <div>{messagesElement}</div>
            <div>
               <div>
                  <textarea onChange={ onNewMessageChange } 
                  value={ newMessageBody } placeholder='Enter your message' name="" id="" cols="30" rows="4"></textarea>
               </div>
               <div>
                  <button onClick={ onSendMessageClick }>Send</button>
               </div>
            </div>
         </div>

      </div>
   );
}

export default Dialogs;