import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let posts = [
  {id: 1, message: 'Hi! How are you?', likeCount: 15, avatar: 'https://pixelbox.ru/wp-content/uploads/2021/04/cats-ava-steam-8.jpg'},
  {id: 2, message: 'It\'s my first post', likeCount: 20, avatar: 'https://pixelbox.ru/wp-content/uploads/2022/08/avatars-viber-pixelbox.ru-29.jpg'},
  {id: 3, message: 'I\'m a sportsman. And you?', likeCount: 25, avatar: 'https://sun6-23.userapi.com/s/v1/if1/axZjentIg7fuN9JbKG3sW6Tf3uDApwUE_XzYSuMAbEMue6sJOxRQ6FtVFqqZPO_Q46Ds4ejZ.jpg?size=959x959&quality=96&crop=0,249,959,959&ava=1'}
]

let dialogs = [
  {id: 1, name: 'Dimych'},
  {id: 2, name: "Andrey"},
  {id: 3, name: "Sveta"},
  {id: 4, name: "Sasha"},
  {id: 5, name: "Victor"},
  {id: 6, name: "Valera"}
];

let messages = [
  {id: 1, message: 'Hi!'},
  {id: 2, message: 'How is your it-kamasutra?'},
  {id: 3, message: 'Yo!'},
  {id: 4, message: 'Yo!'},
  {id: 5, message: 'Yo!'}
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App posts={posts} dialogs={dialogs} messages={messages}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
