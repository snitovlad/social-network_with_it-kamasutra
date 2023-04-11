import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dialogs from './componets/Dialogs/Dialogs';
import Header from './componets/Header/Header';
import Music from './componets/Music/Music';
import Navbar from './componets/Navbar/Navbar';
import News from './componets/News/News';
import Profile from './componets/Profile/Profile';
import Setting from './componets/Setting/Setting';

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Header />
        <Navbar />

        <div className="app-wrapper-content">
          <Routes>
            <Route path="/" element={<Profile />} />
            <Route path="/dialogs" element={<Dialogs />} />
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/setting" element={<Setting />} />

            <Route path="*" exact element={<Profile />} /> {/*для пути по дефолту если страница не найдена*/}
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
