import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Appbar from "./components/appbar/Appbar";
import Registerform from "./pages/login-register/Register";
import Loginform from "./pages/login-register/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/homepage/Homepage";
import ProfilePage from "./pages/profilepage/ProfilePage";
import "bootstrap/dist/css/bootstrap.min.css";
import MenuPage from "./pages/menupage/MenuPage";
import { ProductProvider } from "./components/Contexts/ProductContextProvider";
import Orderpage from "./pages/orderpage/Orderpage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserProvider } from "./components/Contexts/UserContextProvider";
import MyOrdersPage from "./pages/myorderspage/MyOrdersPage";

function App() {
  return (
      <Router>
        {/* Globális kosár adatokat tartalmazó kontextus provider */}
        <ProductProvider>
          {/* Globális felhasználói adatokat tartalmazó kontextus provider */}
          <UserProvider>
            <div className="App">
              {/* Az alkalmazás fejléce */}
              <Appbar />
              {/* A Route elemekkel definiált oldalak */}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<Loginform />} />
                <Route path="/register" element={<Registerform />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/order" element={<Orderpage />} />
                <Route path="/myorders" element={<MyOrdersPage />} />
              </Routes>
              {/* A toast-üzenetek megjelenítésére szolgáló konténer */}
              <ToastContainer
                  style={{ marginTop: "50px" }}
                  position="top-right"
                  autoClose={2000}
                  hideProgressBar
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  pauseOnHover
              />
            </div>
          </UserProvider>
        </ProductProvider>
      </Router>
  );
}

export default App;