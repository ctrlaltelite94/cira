import { Route, Routes } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"

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
      </Routes>

    </>
  )
}

export default App
