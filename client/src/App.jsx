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

function App() {
  const [products, setProducts] = useState([]);
  useEffect( () => {
    const fetchData = async() => {
      const res = await fetch('http://localhost:3005/products');
      const data = await res.json();


      
      const updatedProducts = data.products.map(product => ({
        ...product,
        price: product.price?.$numberDecimal ? parseFloat(product.price.$numberDecimal) : product.price,
      }));

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
        <Route path="/adminpanel" element={<Adminpanel products={products} />} />
      </Routes>
    </Router>
  );
}

export default App

//<Adminpanel products={products}/>