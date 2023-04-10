import './App.css';
import Dialogs from './componets/Dialogs/Dialogs';
import Header from './componets/Header/Header';
import Navbar from './componets/Navbar/Navbar';
import Profile from './componets/Profile/Profile';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <Navbar />
      {/*<Profile />*/}
      <div className="app-wrapper-content">
        <Dialogs />
      </div>
    </div>
  );
}

export default App;
