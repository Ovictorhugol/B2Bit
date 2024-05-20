import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Profile from "./Pages/Profile";
function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route
        path="/login"
        element={
          <>
            <Login />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Profile />
          </>
        }
      />
    </Routes>
  );
}

export default MainRoutes;
