import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import  {scroller} from 'react-scroll';


//import Loader from './utils/loader'


import Navbar from './components/Navbar/Navbar'
import Slider from './components/Slider/slider'
import FeaturedProducts from './components/Catalog/components/featuredProducts'
import ProductDetailsPage from './components/Catalog/components/productDetailsPage/productDetailsPage'
import Catalog from './components/Catalog/catalog';
import Contact from './components/Contact/contact'
import Services from './components/Services/services'
import Partners from './components/Partners/partners'
import Footer from './components/Footer/footer'
import Adminpanel from './components/Adminpanel/apanel'

import Products from './components/Adminpanel/Products/products';
import Dashboard from './components/Adminpanel/Dashboard/Dashboard';
import Reservations from './components/Adminpanel/Reservations/Reservations';
import Settings from './components/Adminpanel/Settings/Settings';
import Visuals from './components/Adminpanel/Visuals/Visuals';
import ProductDetailsForm from './components/Adminpanel/Products/form/utils/productDetails';

function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:3005/products/api/fetch');
        const data = await res.json();
        //console.log("Fetched products:", data);
        setProducts(data);
      } catch (e) {
        console.log("Server Error: ",e);
      }
    }
    fetchData();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Hlavná stránka */}
        <Route
          path="/"
          element={
            <main>
              <Navbar />
              <Slider />
              <FeaturedProducts products={products} />
              <Services id="services"/>
              <Partners id="partners"/>
              <Contact id="contact"/>
              <Footer />
            </main>
          }
        />

        <Route
          path="/catalog"
          element={
            <main>
              <Navbar />
              <Catalog />
              <Contact />
              <Footer />
            </main>
          }
        />

        <Route
          path="/catalog/product/:productID"
          element={
            <main>
              <Navbar />
              <ProductDetailsPage />
              <Footer />
            </main>
          }
        />
        
        {/* Admin Panel */}
        <Route path="/adminpanel" element={<Adminpanel />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="products" element={<Products products={products} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="visuals" element={<Visuals />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App
