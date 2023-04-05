//import logo from './logo.svg';
import './App.css';
import Header from './componets/Header';
import Navbar from './componets/Navbar';
import Profile from './componets/Profile';

function App() {
  return (
      <div className="app-wrapper">
        <Header />
        <Navbar />
        <Profile />
    </div>
  );
}

export default App;
