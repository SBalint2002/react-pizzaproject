import "./App.css";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Appbar from "./components/Appbar";
import Registerform from "./components/Register";
import Loginform from "./components/Login";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Homepage from "./components/Homepage";

function App() {
  return (
    <Router>
    <div className="App">
    <Appbar/>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Loginform />} />
      <Route path="/register" element={<Registerform />} />
    </Routes>
    </div>
  </Router>
  );
}

export default App;
