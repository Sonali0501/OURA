import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import FounderProfile from "./pages/FounderProfile"
import ScrollToTop from "./components/layout/ScrollToTop"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/founder" element={<FounderProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
