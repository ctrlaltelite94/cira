import { Router, Route } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./pages/Home"

function App() {


  return (
    <>
      <Router>
        {/* Home */}
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
      </Router>

    </>
  )
}

export default App
