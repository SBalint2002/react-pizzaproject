import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Appbar from "./components/appbar/Appbar";
import Registerform from "./pages/login-register/Register";
import Loginform from "./pages/login-register/Login";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Welcomepage from "./pages/Welcomepage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/footer/Footer";


function App() {
    return (
        <Router>
                <div className="App">
                    <Appbar/>
                    <Routes>
                        <Route path="/" element={<Homepage/>}/>
                        <Route path="/welcomepage" element={<Welcomepage/>}/>
                        <Route path="/login" element={<Loginform/>}/>
                        <Route path="/register" element={<Registerform/>}/>
                    </Routes>
                </div>
                <Footer/>
        </Router>
    );
}

export default App;
