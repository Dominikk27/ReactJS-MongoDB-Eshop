import React, { useState } from 'react';
import "../Adminpanel/apanel.css"

import { FaUserTie } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { MdOutlinePointOfSale } from "react-icons/md";
import { PiSealPercentFill } from "react-icons/pi";



import { TiPlus } from "react-icons/ti";
import { MdRemoveShoppingCart } from "react-icons/md";
import Popup from "../Adminpanel/Products/form/popUpForms"


import Logo from "../Adminpanel/logo.png"
import ProductsComponent from './Products/products';
import OnSale from './Products/onSale';




function Adminpanel ({products}) {

    const [activeForm, setActiveForm] = useState(null);

   
    const productOnSale = products.filter(product => product.onSale === true);
    
    
    
    const [activeComponent, setActiveComponent] = useState('products');


    const renderComponent = () => {
        switch (activeComponent) {
          case 'dashboard':
            return <h1>Dashboard Content</h1>;
          case 'products':
            return <div>
                <div className="componentHeader">
                    <div className="headerText">
                        <h1>Products</h1>
                    </div>
                    <div className="buttonBox">
                        <ul className="buttonList">
                            <li className="listItem" onClick={() => setActiveForm('addProduct')}>
                            <TiPlus className='icon'/> Add Product
                            </li>
                            <li className="listItem">
                                <MdRemoveShoppingCart className='icon'/> Remove Products
                            </li>
                        </ul>
                    </div>
                </div>
                <ProductsComponent products={products}/>
            </div>
          case 'sales':
            return <div >
                <div className="componentHeader">
                    <div className="headerText">
                        <h1>Sales</h1>
                    </div>
                    <div className="buttonBox">
                        <ul className="buttonList">
                            <li className="listItem">
                            <TiPlus className='icon'/> Add Product
                            </li>
                            <li className="listItem">
                                <MdRemoveShoppingCart className='icon'/> Remove Products
                            </li>
                        </ul>
                    </div>
                </div>
                <OnSale products={productOnSale}/>
            </div>
          default:
            return <h1>Error</h1>;
        }
    };

  return (
    <div className='container'>
        <Popup showForm={activeForm} />
        <div className='aHeader'>
            <div className='logoBox'>
                <img src={Logo} alt="logo" className='logo'/>
            </div>
            <div className='searchBar'>
                
            </div>
            <div className='userIcon'>
                <FaUserTie className='icon'/>
            </div>
        </div>
        <div className='body'>
            <div className='sideNavigation'>
                <ul className='navList'>
                    <li className={`navItem ${activeComponent === 'dashboard' ? 'active' : ''}`} onClick={() => setActiveComponent('dashboard')}>
                        <MdDashboard className='icon'/> Dashboard
                    </li>
                    <li className={`navItem ${activeComponent === 'products' ? 'active' : ''}`} onClick={() => setActiveComponent('products')}>
                        <MdOutlinePointOfSale className='icon'/> Products
                    </li>
                    <li className={`navItem ${activeComponent === 'sales' ? 'active' : ''}`} onClick={() => setActiveComponent('sales')}>
                        <PiSealPercentFill className='icon'/> Sales
                    </li>
                </ul>
            </div>
            <div className='components'>
                {renderComponent()}
            </div>
        </div>
    </div>
  )
}

export default Adminpanel