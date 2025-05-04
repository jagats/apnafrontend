import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Layout from "./components/Layout";
import Profile from "./components/Profile";
import Progress from "./components/Progress";
import Topics from "./components/Topics";
import ProtectedRoute from "./components/ProtectedRoute";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/start"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* This is the common layout with Navbar */}
        <Route index element={<Profile />} />
        <Route path="topics" element={<Topics />} />
        <Route path="progress" element={<Progress />} />
      </Route>
    </Routes>
  );
}
