import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"
import SignIn from "./pages/user/SignIn"
import SignUp from "./pages/user/SignUp";
import ResponderSignIn from "./pages/responder/ResponderSignIn";
import ResponderSignUp from "./pages/responder/ResponderSignUp";
import Dashboard from "./pages/responder/Dashboard";
import { useAppContext } from "./contexts/appContext";
import { Navigate } from "react-router-dom";
import Profile from "./pages/user/Profile";
import Create from "./pages/user/Create";
import UpdateIncident from "./pages/responder/UpdateIncident";
import Incident from "./pages/responder/Incident";

export const ProtectedUserRoute = ({ children }) => {
  const { isLoggedIn, userType } = useAppContext();
  return isLoggedIn && userType === "user" ? children : <Navigate to="/" replace />;
};

// ProtectedResponderRoute.tsx
export const ProtectedResponderRoute = ({ children }) => {
  const { isLoggedIn, userType } = useAppContext();
  console.log(isLoggedIn, userType)
  return isLoggedIn && userType === "responder" ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><SignIn /></Layout>} />
        <Route path="/signup" element={<Layout><SignUp /></Layout>} />
        <Route path="/responder/login" element={<Layout><ResponderSignIn /></Layout>} />
        <Route path="/responder/signup" element={<Layout><ResponderSignUp /></Layout>} />

        {/* Protected Routes for Normal Users */}
        <Route
          path="/user/profile"
          element={
            <ProtectedUserRoute>
              <Layout>
                <Profile />
              </Layout>
            </ProtectedUserRoute>
          }
        />
        <Route
          path="/user/create"
          element={
            <ProtectedUserRoute>
              <Layout>
                <Create />
              </Layout>
            </ProtectedUserRoute>
          }
        />

        {/* Protected Routes for Responders */}
        <Route
          path="/responder/dashboard"
          element={
            <ProtectedResponderRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedResponderRoute>
          }
        />
        <Route
          path="/responder/dashboard/incident/:id"
          element={
            <ProtectedResponderRoute>
              <Layout>
                <Incident />
              </Layout>
            </ProtectedResponderRoute>
          }
        />
        <Route
          path="/responder/dashboard/incident/update/:id"
          element={
            <ProtectedResponderRoute>
              <Layout>
                <UpdateIncident />
              </Layout>
            </ProtectedResponderRoute>
          }
        />

        {/* Catch all - redirect */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
