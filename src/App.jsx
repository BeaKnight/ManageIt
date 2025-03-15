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

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;