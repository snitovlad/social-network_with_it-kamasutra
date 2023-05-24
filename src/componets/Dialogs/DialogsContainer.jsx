import { sendMessageCreator, updateNewMessageBodyCreator } from '../../Redux/dialogs-reducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';


const DialogsContainer = (props) => {

   /*let state = props.store.getState().dialogsPage; //создали локальный state

   let onSendMessageClick = () => {
      props.store.dispatch(sendMessageCreator())
   }

   let onNewMessageChange = (body) => {
      props.store.dispatch(updateNewMessageBodyCreator(body));
   }*/


   return (
      <StoreContext.Consumer>{   // >{ должно быть без пробела или { с новой строки
         (store) => {

            let state = store.getState().dialogsPage; //создали локальный state

            let onSendMessageClick = () => {
               store.dispatch(sendMessageCreator())
            }

            let onNewMessageChange = (body) => {
               store.dispatch(updateNewMessageBodyCreator(body));
            }

            return <Dialogs updateNewMessageBody={onNewMessageChange} sendMessage={onSendMessageClick} dialogsPage={state} />
         }
      }

      </StoreContext.Consumer>
   );

}

export default DialogsContainer;