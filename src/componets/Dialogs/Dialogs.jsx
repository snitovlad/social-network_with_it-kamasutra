import { createRef } from 'react';
import DialogItem from './DialogItem/DialogItem';
import s from './Dialogs.module.css'
import Message from './Message/Message';


const Dialogs = (props) => {

   let dialogsElement = props.state.dialogs.map( dial => <DialogItem key={dial.id} id={dial.id} name={dial.name} avatar={dial.avatar} />)
   let messagesElement = props.state.messages.map( mess => <Message key={mess.id} id={mess.id} message={mess.message} />)

   let newMessageElement = createRef();
   let addMessage = () => {
      let text = newMessageElement.current.value;
      alert(text);
   }


   return (
      <div className={s.dialogs}>

         <div className={s.dialogsItems}>
            { dialogsElement }
         </div>
         <div className={s.messages}>
            { messagesElement }
            <div>
            <div>
               <textarea ref={ newMessageElement } name="" id="" cols="30" rows="4"></textarea>
            </div>
            <div>
               <button onClick={ addMessage }>Add message</button>
            </div>
         </div>
         </div>

      </div>
   );
}

export default Dialogs;