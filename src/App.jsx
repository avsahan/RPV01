import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import TravelerSignup from './pages/TravelerSignup.jsx'
import GuideSignup from './pages/GuideSignup.jsx'
import './styles/App.css'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Login/travelerSignup" element={<TravelerSignup />} />
          <Route path="/Login/guideSignup" element={<GuideSignup />} />
        </Routes>
      </BrowserRouter>
    </>
    );
}

export default App;