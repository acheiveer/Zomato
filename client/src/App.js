import './App.css';
import { Routes, Route, Navigate } from "react-router-dom"

// Pages
import GoogleAuthPage from './pages/GoogleAuthPage';
import CheckoutPage from './pages/CheckoutPage';
import HomePage from './pages/HomePage';
import RestaurantPage from './pages/RestaurantPage';

// Components
import Menu from './components/Restaurant/Menu';
import OrderOnline from './components/Restaurant/OrderOnline';
import Overview from './components/Restaurant/Overview';
import Photos from './components/Restaurant/Photos';
import Reviews from './components/Restaurant/Reviews';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/delivery" />} />
        <Route path="/:type" element={<HomePage />} />
        {/* <Route path="/restaurant/:id" element={<RedirectRestaurant />} /> */}
        <Route path="/google/:token" element={<GoogleAuthPage />} />
        <Route path="/restaurant/:id" element={<RestaurantPage />}>
          <Route path="overview" element={<Overview />} />
          <Route path="order-online" element={<OrderOnline />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="menu" element={<Menu />} />
          <Route path="photos" element={<Photos />} />
        </Route>
        <Route path="/checkout/orders" element={<CheckoutPage />} />
      </Routes>
    </>
  );
}

export default App;