import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"
import SignIn from "./pages/user/SignIn"
import SignUp from "./pages/user/SignUp";
import ResponderSignIn from "./pages/responder/ResponderSignIn";
import ResponderSignUp from "./pages/responder/ResponderSignUp";

function App() {


  return (
    <>
      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <SignUp />
            </Layout>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              <SignIn />
            </Layout>
          }
        />
        <Route
          path="/responder/login"
          element={
            <Layout>
              <ResponderSignIn />
            </Layout>
          }
        />
        <Route
          path="/responder/signup"
          element={
            <Layout>
              <ResponderSignUp />
            </Layout>
          }
        />
      </Routes>

    </>
  )
}

export default App
