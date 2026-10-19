import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import TravelerSignup from './pages/TravelerSignup.jsx'
import GuideSignup from './pages/GuideSignup.jsx'
import TraverHomePage from "./pages/TraverHomePage.jsx";
import TraverPlannerPage from "./pages/TraverPlannerPage.jsx";
import GuiderSelection from "./pages/GuiderSelection.jsx";
import TraverDashboard from "./pages/TraverDashboard.jsx";
import GuideDashboard from "./pages/GuideDashboard.jsx";
import './styles/global.css'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Login/travelerSignup" element={<TravelerSignup />} />
          <Route path="/Login/guideSignup" element={<GuideSignup />} />
          <Route path="/Login/TravelHomePage" element={<TraverHomePage />} />
          <Route path="/Login/TravelHomePage/TraverPlannerPage" element={<TraverPlannerPage />} />
          <Route path="/Login/TravelHomePage/TraverPlannerPage/GudiderSelection" element={<GuiderSelection />} />
          <Route path="/Login/TraverDashboard" element={<TraverDashboard />} />
          <Route path="/Login/GuideDashboard" element={<GuideDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
    );
}

export default App;