const SEND_MESSAGE = 'dialogs/SEND_MESSAGE';

type DialogsType = {
   id: number
   name: string
   avatar: string
}
type MessagesType = {
   id: number
   message: string
}
type InitialStateType = typeof initialState;

let initialState = {
   dialogs:
            [
               { id: 1, name: 'Dimych', avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-72.jpg' },
               { id: 2, name: "Andrey", avatar: 'https://android-obzor.com/wp-content/uploads/2022/03/79-3.jpg' },
               { id: 3, name: "Sveta", avatar: 'https://placepic.ru/wp-content/uploads/2018/05/image_5319021115093426252.jpg' },
               { id: 4, name: "Sasha", avatar: 'https://loxotrona.net/backend/uploads/2022/Schools-Krasnodar/AVATAR-S/20.jpg' },
               { id: 5, name: "Victor", avatar: 'https://i.pinimg.com/originals/f9/2b/01/f92b01129be5708ccc459604ad978e6a.jpg' },
               { id: 6, name: "Valera", avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/rcbeu.jpg' }
            ] as Array<DialogsType>,
         messages:
            [
               { id: 1, message: 'Hi!' },
               { id: 2, message: 'How is your it-kamasutra?' },
               { id: 3, message: 'Yo!' },
               { id: 4, message: 'Yo!' },
               { id: 5, message: 'Yo!' }
            ] as Array<MessagesType>,
            newMessageBody: ''
}

const dialogsReducer = (state = initialState, action: SendMessageCreatorActionType): InitialStateType => {
   switch (action.type) {

      case SEND_MESSAGE: {
         return {
            ...state,
            newMessageBody: '',
            messages: [...state.messages,
               { id: 6, message: action.newMessageBody }]
         };
      }

      default:
         return state;
   }
};

type SendMessageCreatorActionType = {
   type: typeof SEND_MESSAGE
   newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({ 
   type: SEND_MESSAGE, newMessageBody });

export default dialogsReducer;