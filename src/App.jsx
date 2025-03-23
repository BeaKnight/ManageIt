import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/LoginScreen/Loginpage"; 
import Dashboard from "./pages/Userdashboard/Dashboard"; 
import Maintenace from "./pages/Maintenance/Maintenance";
import Carpentry from "./pages/Maintenance/Carpentry";
import Janitorial from "./pages/Maintenance/Janitorial";
import Electrical from "./pages/Maintenance/Electrical";
import AirConditioning from "./pages/Maintenance/AirConditioning";
import Notifications from "./pages/Userdashboard/Notifications";
import Schedules from "./pages/Userdashboard/Schedules";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import Signuppage from "./pages/SignupScreen/Signuppage";
import Adminnotifications from "./pages/AdminDashboard/Adminnotifications";
import AdminSchedules from "./pages/AdminDashboard/AdminSchedules";
import AdminMaintenance from "./pages/AdminDashboard/AdminMaintenance";
import Requests from "./pages/AdminDashboard/Requests";
import AdminJanitorial from "./pages/AdminDashboard/adminMaintenance/AdminJanitorial";
import AdminElectrical from "./pages/AdminDashboard/adminMaintenance/AdminElectrical";
import AdminCarpentry from "./pages/AdminDashboard/adminMaintenance/AdminCarpentry";
import AdminAirconditioning from "./pages/AdminDashboard/adminMaintenance/AdminAirconditioning";
import AdminCarpentryform from "./pages/AdminDashboard/AdminCarpentryform";

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/loginpage" element={<Loginpage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/maintenance" element={<Maintenace />} />
        <Route path="/janitorial" element={<Janitorial />} />
        <Route path="/carpentry" element={<Carpentry />} />
        <Route path="/electrical" element={<Electrical />} />
        <Route path="/airconditioning" element={<AirConditioning />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/schedules" element={<Schedules />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminnotifications" element={<Adminnotifications />} />
        <Route path="/adminschedules" element={<AdminSchedules />} />
        <Route path="/adminmaintenance" element={<AdminMaintenance />} />
        <Route path="/requests" element={<Requests token={token}/>} />
        <Route path="/adminjanitorial" element={<AdminJanitorial />} />
        <Route path="/adminelectrical" element={<AdminElectrical />} />
        <Route path="/admincarpentry" element={<AdminCarpentry />} />
        <Route path="/adminairconditioning" element={<AdminAirconditioning />} />
        <Route path="/admincarpentryform/:id" element={<AdminCarpentryform token={token} />} />
        <Route path="/signuppage" element={<Signuppage />} />
      </Routes>
    </Router>
  );
}

export default App;