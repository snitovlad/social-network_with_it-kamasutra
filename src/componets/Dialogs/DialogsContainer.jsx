import { connect } from 'react-redux';
import { sendMessageCreator } from '../../Redux/dialogs-reducer';
import Dialogs from './Dialogs';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';
//import { withRouter } from '../../hoc/withRouter';


let mapStateToProps = (state) => {
   return {
      dialogsPage: state.dialogsPage
   }
}

let mapDispatchToProps = (dispatch) => {
   return {
      sendMessage: (newMessageBody) => {
         dispatch(sendMessageCreator(newMessageBody))
      }
   }
}

//const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(AuthRedirectComponent);

//export default DialogsContainer;

export default compose(
   //withRouter,
   connect(mapStateToProps, mapDispatchToProps),
   withAuthRedirect
)(Dialogs)