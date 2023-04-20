let state = {
   profilePage: {
      posts: 
         [
            {id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg'},
            {id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg'},
            {id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1'}
          ]      
   },
   dialogsPage: {
      dialogs: 
      [
         {id: 1, name: 'Dimych', avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-72.jpg'},
         {id: 2, name: "Andrey", avatar: 'https://android-obzor.com/wp-content/uploads/2022/03/79-3.jpg'},
         {id: 3, name: "Sveta", avatar: 'https://placepic.ru/wp-content/uploads/2018/05/image_5319021115093426252.jpg'},
         {id: 4, name: "Sasha", avatar: 'https://loxotrona.net/backend/uploads/2022/Schools-Krasnodar/AVATAR-S/20.jpg'},
         {id: 5, name: "Victor", avatar: 'https://i.pinimg.com/originals/f9/2b/01/f92b01129be5708ccc459604ad978e6a.jpg'},
         {id: 6, name: "Valera", avatar: 'https://otkritkis.com/wp-content/uploads/2022/06/rcbeu.jpg'}
       ],
       messages:
       [
         {id: 1, message: 'Hi!'},
         {id: 2, message: 'How is your it-kamasutra?'},
         {id: 3, message: 'Yo!'},
         {id: 4, message: 'Yo!'},
         {id: 5, message: 'Yo!'}
       ]
   },
   sidebar: {
      friends: [
         {id: 1, name: "Andrey"},
         {id: 2, name: "Sasha"},
         {id: 3, name: "Sveta"}
      ]
   }
 }

 export default state;