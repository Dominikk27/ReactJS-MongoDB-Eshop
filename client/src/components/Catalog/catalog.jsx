import React, { useEffect, useState } from 'react';
import { FaBars } from "react-icons/fa";

import config from '../../utils/config';

import Card from './card/card';

import "../Catalog/catalog.css"
import Catalog_Sidebar from './components/Sidebar/Catalog_Sidebar';

const Catalog = () => {
    const [loadedProducts, setLoadedProducts] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [sections, setSections] = useState([]);
    
    useEffect(() =>{
        const fetchProducts = async () =>{
            try{
                const productRes = await fetch(`${config.API_URL}/products/api/fetch`);
                const productData = await productRes.json();
                //console.log(productData);
                setLoadedProducts(productData);
            }catch (e){
                console.error("Failed to fetch products! error: ", e);
            }
        };
        fetchProducts();
    },[]);

    useEffect(() =>{
        const fetchFilterData = async () =>{
          try{
            const res = await fetch(`${config.API_URL}/products/filters/getFilters`);
            const filterData = await res.json();
            setSections(filterData);
    
          }catch(e){
            console.log("Failed to fetch filter data! error: ", e);
          }
        }
        fetchFilterData();
      }, []);

    return (
        <div className="container">
            <div className="catalogBox">
                <div className={`leftSide ${!isOpen ? "closed" : "opened"}`}>
                    <Catalog_Sidebar filters={sections} isOpen={isOpen} setIsOpen={setIsOpen}/>
                    <div className="sideBarBTNContainer">
                        <button className={`sideBar_Button ${!isOpen ? "closed" : "opened"}`} onClick={() => setIsOpen(prev => !prev)}>
                            <FaBars className='icon'/>
                        </button>
                    </div>
                </div>

                <div className="rightSide">
                    <div className="productsListBox">
                        {loadedProducts.length > 0 ? (
                            loadedProducts.map((product) => (
                                <Card key={product._id} product={product}/>
                            ))
                        ) : (
                            <p>Načítavam produkty!</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Catalog