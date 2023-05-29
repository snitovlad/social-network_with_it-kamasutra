const SEND_MESSAGE = 'SEND_MESSAGE';
const UPDATE_NEW_MESSAGE_BODY = 'UPDATE_NEW_MESSAGE_BODY';

let initialState = {
   dialogs:
            [
               { id: 1, name: 'Dimych', avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-72.jpg' },
               { id: 2, name: "Andrey", avatar: 'https://android-obzor.com/wp-content/uploads/2022/03/79-3.jpg' },
               { id: 3, name: "Sveta", avatar: 'https://placepic.ru/wp-content/uploads/2018/05/image_5319021115093426252.jpg' },
               { id: 4, name: "Sasha", avatar: 'https://loxotrona.net/backend/uploads/2022/Schools-Krasnodar/AVATAR-S/20.jpg' },
               { id: 5, name: "Victor", avatar: 'https://i.pinimg.com/originals/f9/2b/01/f92b01129be5708ccc459604ad978e6a.jpg' },
               { id: 6, name: "Valera", avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/rcbeu.jpg' }
            ],
         messages:
            [
               { id: 1, message: 'Hi!' },
               { id: 2, message: 'How is your it-kamasutra?' },
               { id: 3, message: 'Yo!' },
               { id: 4, message: 'Yo!' },
               { id: 5, message: 'Yo!' }
            ],
         newMessageBody: ''
}

const dialogsReducer = (state = initialState, action) => {
   switch (action.type) {

      case SEND_MESSAGE: {
         //let newMessage = state.newMessageBody;

         return {
            ...state,
            newMessageBody: '',
            messages: [...state.messages,
               { id: 6, message: state.newMessageBody }]
         };
      }
      case UPDATE_NEW_MESSAGE_BODY: {

         return {
            ...state,
            newMessageBody: action.inActionNewMessage
         };
      }
      default:
         return state;
   }
};

export const sendMessageCreator = () => ({ type: SEND_MESSAGE });
export const updateNewMessageBodyCreator = (body) => ({ type: UPDATE_NEW_MESSAGE_BODY, inActionNewMessage: body })

export default dialogsReducer;