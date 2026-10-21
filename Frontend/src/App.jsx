import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TravelerSignup from "./pages/TravelerSignup"
import GuideSignup from "./pages/GuideSignup";
import TraverDashboard from "./pages/TraverDashboard";
import "./styles/global.css";

function App() {
  const [activePage, setActivePage] = useState('home');
  const [isLogged, setLogged] = useState(false);
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (loggedInUser) => {
  setUser(loggedInUser);

  if (loggedInUser.role === "traveler") {
    setActivePage("traveler-dashboard");
  } else if (loggedInUser.role === "guide") {
    setActivePage("guide-dashboard");
  }
};

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
        {activePage === 'login' && <Login onSignTraveler={navigateToSignTravelerSection} onSignGuide={navigateToGuideSection} onLoginSuccess={handleLoginSuccess}/>}
        {activePage === 'sign-traveler' && <TravelerSignup backToLogin={navigateToLoginSection}/> }
        {activePage === 'sign-guide' && <GuideSignup /> }
        {activePage === 'traveler-dashboard'  && user?.role === 'traveler' && <TraverDashboard />}
      </main>
    </div>
  );
}

export default App;
