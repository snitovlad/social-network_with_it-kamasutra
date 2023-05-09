const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

const dialogsReducer = (state, action) => {
   switch (action.type) {

      case SEND_MESSAGE:
         let newMessage = state.newMessageBody;
         state.newMessageBody = "";  //зануляем поле ввода
         state.messages.push({ id: 6, message: newMessage });
         return state;

      case UPDATE_NEW_MESSAGE_BODY:
         state.newMessageBody = action.inActionNewMessage;
         return state;

      default:
         return state;
   }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, inActionNewMessage: body })

export default dialogsReducer;