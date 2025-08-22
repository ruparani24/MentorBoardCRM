import { Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import Mentors from "./pages/Mentors";
import Mentees from "./pages/Mentees";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<Login />} />

      {/* Protected routes under Layout */}
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="mentors" element={<Mentors />} />
        <Route path="mentees" element={<Mentees />} />
      </Route>
    </Routes>
  );
}

export default App;
