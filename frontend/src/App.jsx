import "./assets/css/style.css";
import Header from "./components/Header.jsx";
import Main from "./components/Main.jsx";
import Footer from "./components/Footer.jsx";
import Register from "./components/Register.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import AuthProvider from "./AuthProvider.jsx";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import PublicRoute from "./PublicRoute.jsx";

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<PublicRoute><Main /></PublicRoute>} />
            <Route path="/register/" element={<PublicRoute><Register /></PublicRoute>} />
            <Route path="/login/" element={<PublicRoute><Login /></PublicRoute>} />
            <Route path='/dashboard/' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
