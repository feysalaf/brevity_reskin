import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./screens/Login";
import Register from "./screens/Register.tsx";
import Initialize from "./screens/Initialize.tsx";
import Welcome from "./screens/Welcome.tsx";
import AgreeTerms from "./screens/AgreeTerms.tsx";
import MainLayout from "./Layouts/MainLayout.tsx";
import Home from "./screens/Home.tsx";
import Profile from "./screens/Profile.tsx";
import Contact from "./screens/Contact.tsx";
import Pricing from "./screens/Pricing.tsx";
import ManagePlans from "./screens/ManagePlans.tsx";
import Faq from "./screens/Faq.tsx";
import Settings from "./screens/Settings.tsx";
import EditProfile from "./screens/EditProfile.tsx";
import NewAnalysis from "./screens/NewAnalysis.tsx";
import FileUpload from "./screens/FileUpload.tsx";
import Analyze from "./screens/Analyze.tsx";
import AnalysisResults from "./screens/AnalysisResults.tsx";
import ProtectedRoute from "./Layouts/ProtecetedRoutes.tsx";
import '@mantine/core/styles.css';


// import Sample from './screens/Sample'
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Initialize />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="" element={<ProtectedRoute />}>
          <Route path="/agree-terms" element={<AgreeTerms />} />
          <Route path="user" element={<MainLayout />}>
            <Route path="home" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="contact" element={<Contact />} />
            <Route path="faq" element={<Faq />} />
            <Route path="manageplans" element={<ManagePlans />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="edit/profile" element={<EditProfile />} />
            <Route path="new-analysis" element={<NewAnalysis />} />
            <Route path="new-analysis/upload/:type" element={<FileUpload />} />
            <Route path="analyze/:type/:count" element={<Analyze />} />\
            <Route path="analysis-results" element={<AnalysisResults />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
