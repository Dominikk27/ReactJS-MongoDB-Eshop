import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar'
import Slider from './components/Slider/slider'
import Catalog from './components/Catalog/catalog'
import Contact from './components/Contact/contact'
import Services from './components/Services/services'
import Partners from './components/Partners/partners'
import Footer from './components/Footer/footer'
import Adminpanel from './components/Adminpanel/apanel'

import Products from './components/Adminpanel/Products/products';
import Dashboard from './components/Adminpanel/Dashboard/Dashboard';
import Settings from './components/Adminpanel/Settings/Settings';
import Visuals from './components/Adminpanel/Visuals/Visuals';

function App() {
  const [products, setProducts] = useState([]);
  useEffect( () => {
    const fetchData = async() => {
      const res = await fetch('http://localhost:3005/adminpanel/products');
      const data = await res.json();


      
      const updatedProducts = data.products.map(product => {
        const price = product.defaultPrice ? parseFloat(product.defaultPrice) : 0;
        const salePrice = product.onSalePrice ? parseFloat(product.onSalePrice) : 0;


        return {
          ...product,
          productPrice: price,
          productSalePrice: salePrice,
          productImages: product.productImages || []
        };
      });

      setProducts(updatedProducts);
    }
    fetchData()
  }, [])

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
              <Catalog products={products} />
              <Services />
              <Partners />
              <Contact />
              <Footer />
            </main>
          }
        />
        
        {/* Admin Panel */}
        <Route path="/adminpanel" element={<Adminpanel />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products products={products} />} />
          <Route path="settings" element={<Settings />} />
          <Route path="visuals" element={<Visuals />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App

//<Adminpanel products={products}/>

/*
              <Navbar />
              <Slider />
              <Catalog products={products} />
              <Services />
              <Partners />
              <Contact />
              <Footer />
*/