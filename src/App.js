import React from 'react';
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Music from './componets/Music/Music';
import News from './componets/News/News';
import Setting from './componets/Setting/Setting';
import FriendsPage from './componets/FriendsPage/FriendsPage';
//import DialogsContainer from './componets/Dialogs/DialogsContainer';
import NavbarContainer from './componets/Navbar/NavbarContainer';
import UsersContainer from './componets/Users/UsersContainer';
//import ProfileContainer from './componets/Profile/ProfileContainer';
import HeaderContainer from './componets/Header/HeaderContainer';
import Login from './componets/Login/Login';
import { initializeApp, showGlobalError } from '../src/Redux/app-reducer'
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from './hoc/withRouter';
import Preloader from './componets/common/Preloader/Preloader';
import store from './Redux/redux-store';
import { lazy } from 'react';
import { Suspense } from 'react';

const ProfileContainer = lazy(() => import('./componets/Profile/ProfileContainer')); //ленивая загрузка
const DialogsContainer = lazy(() => import('./componets/Dialogs/DialogsContainer')); //ленивая загрузка



class App extends React.Component {

  //метод для отображения отловленной ошибки глобально в приложении
  //еще почему-то в консоли присутствует какая-то ошибка
  catchAllUnhandledErrors = (promiseRejectionEvent) => {    //реализовали еще через try-catch в profile-reducer и других
    this.props.showGlobalError(promiseRejectionEvent.reason.message)
  }

  componentDidMount() {
    this.props.initializeApp();

    //отлавливаем ошибку подписавшись на глобальное событие unhandledrejection
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors)  //реализовали в profile-reducer и других
  }

  //отменяем подписку на глобальное событие unhandledrejection  //реализовали в profile-reducer и других
  componentWillUnmount() {
    window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors)
  }

  render() {

    if (!this.props.initialized) { //если приложение не проинициализировано (пользователь не залогинен) - тогда крутилка
      return <Preloader />
    }

    return (
      < div className="app-wrapper" >


        <HeaderContainer />
        <NavbarContainer />

        <div className="app-wrapper-content" >
          {this.props.globalError && <div className='show-global-error'>{this.props.globalError}</div>}
          {/* Suspense (если не импортировать, то React.Suspense) ожидает, 
каким способом (ленивым или нет) ему грузить  */}
          <Suspense fallback={<Preloader />}>
            <Routes>

              {/* чтобы главная страничка сразу показывала наш профиль */}
              <Route path="/" element={<Navigate to='/profile' />} />

              <Route path="/profile/:userId?" element={<ProfileContainer />} />
              <Route path="/dialogs/*" element={<DialogsContainer />} />  {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
              <Route path="/users" element={<UsersContainer pageTitle={"Samurai"}/>} />
              <Route path="/news" element={<News />} />
              <Route path="/music" element={<Music />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/friends" element={<FriendsPage />} />
              <Route path="/login" element={<Login />} />

              <Route path="*" element={<div className='error404'>
                <img src="https://img.freepik.com/free-vector/404-error-with-a-cute-animal-concept-illustration_114360-1900.jpg?w=1480&t=st=1698149752~exp=1698150352~hmac=485f4796d637075afbaab6dd011d57a446ab459be627e0a5a020150773300ec3" alt='error404'/>
              </div>} />
            </Routes>
          </Suspense>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
  globalError: state.app.globalError
})

// export default compose( 
//   withRouter,   //обернули в withRouter, т.к. сбивается работа Route - работает не так хорошо. Вроде норм работает и без
//   connect(mapStateToProps, {initializeApp}))(App);

//создали условную контейнерную APP компоненту
let AppContainer = compose(
  withRouter,   //обернули в withRouter, т.к. сбивается работа Route - работает не так хорошо. Вроде норм работает и без
  connect(mapStateToProps, { initializeApp, showGlobalError }))(App);

//создали другую APP компоненту, которая будет оборачивать у себя все что делается в index.js
const SamuraiJSApp = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      {/* Сделали HashRouter вместо  BrowserRouter чтобы приложение адекватно вело себя в github pages */}
      {/* <HashRouter>  */}
      {/*Provider - это контекстная компонента, к-рая передает store всем дочерним компонентам App, обернутым в connect */}
      <Provider store={store}>
        <AppContainer />
      </Provider>
      {/* </HashRouter> */}
    </BrowserRouter>
  </React.StrictMode>
};

export default SamuraiJSApp;

