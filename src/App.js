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
    <BrowserRouter> {/*это можно вынести в index.js <React.StrictMode><BrowserRouter><App /></BrowserRouter></React.StrictMode> */}
      <div className="app-wrapper">
        <Header />
        <Navbar />

        <div className="app-wrapper-content">
          <Routes>
            <Route path="/profile" element={<Profile />} />
            <Route path="/dialogs/*" element={<Dialogs />} /> {/*зведочка * для нестрогого указания пути. Дальше может быть что-то еще */}
            <Route path="/news" element={<News />} />
            <Route path="/music" element={<Music />} />
            <Route path="/setting" element={<Setting />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
