import { connect } from 'react-redux';
import { sendMessageCreator, updateNewMessageBodyCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';


let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

let AuthRedirectComponent = withAuthRedirect(Dialogs);  //делаем редирект страницы если нет авторизации


let mapDispatchToProps = (dispatch) => {
   return {
      updateNewMessageBody: (body) => {
         dispatch(updateNewMessageBodyCreator(body))
      },
      sendMessage: () => {
         dispatch(sendMessageCreator())
      }
   }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

export default DialogsContainer;