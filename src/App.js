import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginSignup from "./components/LoginSignUp/LoginSignup"; // Import Bootstrap CSS
import Calendar from './components/CalendarApp/Calendar';
import Sidebar from './components/CalendarApp/Sidebar';
import EisenhowerMatrix from './components/EisenhowerMatrix/EisenhowerMatrix';


function App() {
    return (
        <Router>
            <div className="d-flex">
                <Sidebar />
                <div className="flex-grow-1 p-3">
                    <Routes>
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/matrix" element={<EisenhowerMatrix />} />
                        <Route path="/login" element={<LoginSignup />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
