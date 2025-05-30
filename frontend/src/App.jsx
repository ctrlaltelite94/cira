import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"
import SignIn from "./pages/user/SignIn"
import SignUp from "./pages/user/SignUp";

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
      </Routes>

    </>
  )
}

export default App
