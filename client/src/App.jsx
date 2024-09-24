import React, { useEffect, useState } from 'react'

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
      setProducts(data.products);
    }
    fetchData()
  }, [])

  return (
    <div>
      <main>
        <Adminpanel products={products}/>
      </main>
    </div>
  )
}

export default App