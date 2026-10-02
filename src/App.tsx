import { Routes, Route, BrowserRouter } from "react-router-dom"
import Home from "./pages/Home"
import FounderProfile from "./pages/FounderProfile"
import ProductDetail from "./pages/ProductDetail"
import ScrollToTop from "./components/layout/ScrollToTop"
import CartProvider from "./context/CartProvider"
import WelcomeOffer from "./components/layout/WelcomeOffer"

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <WelcomeOffer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/founder" element={<FounderProfile />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/products" element={<ProductDetail />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
