import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TravelerSignup from "./pages/TravelerSignup"
import GuideSignup from "./pages/GuideSignup"
import "./styles/global.css";

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLogged, setLogged] = useState(false);

  const navigateToLoginSection = () => {
    setActivePage('login');
    handleLogin();
  }

  const handleLogin = () => {
    setLogged(true);
  }

  const navigateToSignTravelerSection = () => {
    setActivePage('sign-traveler');
  }

  const navigateToGuideSection = () => {
    setActivePage('sign-guide');
  }
  return (
    <div className="app-main">
      <Navbar onLoginSection={navigateToLoginSection} isLoggedIn={isLogged}/>
      <main className="content-body">
        {activePage === 'home' && <Home onLoginSection={navigateToLoginSection}/>}
        {activePage === 'login' && <Login onSignTraveler={navigateToSignTravelerSection} onSignGuide={navigateToGuideSection}/>}
        {activePage === 'sign-traveler' && <TravelerSignup /> }
        {activePage === 'sign-guide' && <GuideSignup /> }
      </main>
    </div>
  );
}

export default App;
