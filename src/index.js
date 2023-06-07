import reportWebVitals from './reportWebVitals';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/redux-store';
import { BrowserRouter } from 'react-router-dom';
import  { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

//let rerenderEntireTree = (state) => {
  root.render(
    //<React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>  {/*это котекстная компонента, к-рая передает store всем дочерним компонентам App */}
          {/*<StoreContext.Provider value={store}> мы это все инкапсулировали в Provider*/} 
          <App /*state={state} dispatch={store.dispatch.bind(store)} store={store}*/ />
          {/*</StoreContext.Provider>*/}
        </Provider>
      </BrowserRouter>
    //</React.StrictMode>
  );
//}

/*rerenderEntireTree(); //убрали из аргумента store.getState()

//store.subscribe(rerenderEntireTree);  //т.к. нужно взять где-то state, а redux не отдает его автоматически
store.subscribe(() => {  //т.к. в редаксовском store ф-ция _callSubscriber не передает state
  //let state = store.getState();
  rerenderEntireTree(); //убрали из аргумента state
});*/

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
