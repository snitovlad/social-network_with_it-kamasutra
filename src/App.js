import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './componets/Header/Header';
import Music from './componets/Music/Music';
import Navbar from './componets/Navbar/Navbar';
import News from './componets/News/News';
import Profile from './componets/Profile/Profile';
import Setting from './componets/Setting/Setting';
import FriendsPage from './componets/FriendsPage/FriendsPage';
import DialogsContainer from './componets/Dialogs/DialogsContainer';


function App(props) {
  return (
    // <BrowserRouter> { /*это можно вынести в index.js <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode> */}
      < div className="app-wrapper" >

        <Header />
        <Navbar /*state={props.state.sidebar}*/ /> 

        <div className="app-wrapper-content" >
          <Routes>
            <Route path="/profile" element={<Profile /*store={props.store}*/ />} />  {/*Вместо posts={props.posts} можно {...props} */}
            <Route path="/dialogs/*" element={<DialogsContainer /*store={props.store}*/ />} />  {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
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
