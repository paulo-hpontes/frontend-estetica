import "./App.css";

// Custom Hooks
import { useAuth } from "./hooks/useAuth";

// React Hooks
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Components
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Page404 from "./pages/Page404/Page404";
import SchedSuccess from "./pages/Scheduling/SchedSuccess";
import SchedFailure from "./pages/Scheduling/SchedFailure";
import SchedPending from "./pages/Scheduling/SchedPending";

function App() {
  const { auth, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/success" element={<SchedSuccess />} />
          <Route path="/failure" element={<SchedFailure />} />
          <Route path="/pending" element={<SchedPending />} />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="/register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Page404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
