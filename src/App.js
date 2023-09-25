import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Music from './componets/Music/Music';
import News from './componets/News/News';
import Setting from './componets/Setting/Setting';
import FriendsPage from './componets/FriendsPage/FriendsPage';
import DialogsContainer from './componets/Dialogs/DialogsContainer';
import NavbarContainer from './componets/Navbar/NavbarContainer';
import UsersContainer from './componets/Users/UsersContainer';
import ProfileContainer from './componets/Profile/ProfileContainer';
import HeaderContainer from './componets/Header/HeaderContainer';
import Login from './componets/Login/Login';
import { initializeApp } from '../src/Redux/app-reducer'
import { Provider, connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from './hoc/withRouter';
import Preloader from './componets/common/Preloader/Preloader';
import store from './Redux/redux-store';

class App extends React.Component {

  componentDidMount() {
    this.props.initializeApp();
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
          <Routes>

            <Route path="/profile/:userId?" element={<ProfileContainer />} /> {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
            <Route path="/dialogs/*" element={<DialogsContainer />} />  {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/friends" element={<FriendsPage />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized
})

// export default compose( 
//   withRouter,   //обернули в withRouter, т.к. сбивается работа Route - работает не так хорошо. Вроде норм работает и без
//   connect(mapStateToProps, {initializeApp}))(App);

//создали условную контейнерную APP компоненту
let AppContainer = compose(
  withRouter,   //обернули в withRouter, т.к. сбивается работа Route - работает не так хорошо. Вроде норм работает и без
  connect(mapStateToProps, { initializeApp }))(App);

//создали другую APP компоненту, которая будет оборачивать у себя все что делается в index.js
const SamuraiJSApp = (props) => {
  return <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>  {/*это котекстная компонента, к-рая передает store всем дочерним компонентам App */}
        <AppContainer />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
};

export default SamuraiJSApp;

