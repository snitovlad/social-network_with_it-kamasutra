import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componets/Header/Header';
import Music from './componets/Music/Music';
import News from './componets/News/News';
import Profile from './componets/Profile/Profile';
import Setting from './componets/Setting/Setting';
import FriendsPage from './componets/FriendsPage/FriendsPage';
import DialogsContainer from './componets/Dialogs/DialogsContainer';
import NavbarContainer from './componets/Navbar/NavbarContainer';
import UsersContainer from './componets/Users/UsersContainer';


function App(props) {
  return (
    // <BrowserRouter> { /*это можно вынести в index.js <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode> */}
      < div className="app-wrapper" >

        <Header />
        <NavbarContainer /> 

        <div className="app-wrapper-content" >
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs/*" element={<DialogsContainer />} />  {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
            <Route path="/users" element={<UsersContainer />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/friends" element={<FriendsPage />} />
          </Routes>
        </div>
      </div >
      //</BrowserRouter>
  );
}

export default App;
