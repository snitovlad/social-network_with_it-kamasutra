import reportWebVitals from './reportWebVitals';
import { rerenderEntireTree } from './render';
import state from './Redux/state';

//addPost('hello')

/*const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>    
      <App state={state} addPost={addPost} />
  </React.StrictMode>
);*/
rerenderEntireTree(state);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
