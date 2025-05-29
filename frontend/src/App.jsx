import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"
import SignIn from "./pages/user/SignIn"
import "mdb-react-ui-kit/dist/css/mdb.min.css";

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
              <Home />
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
