import React, { useEffect, useState } from 'react'

import Card from './card/card';

import "../Catalog/Catalog.css"

const Catalog = () => {
    const [loadedProducts, setLoadedProducts] = useState([]);

    useEffect(() =>{
        const fetchProducts = async () =>{
            try{
                const productRes = await fetch("http://localhost:3005/products/api/fetch");
                const productData = await productRes.json();
                //console.log(productData);
                setLoadedProducts(productData);
            }catch (e){
                console.error("Failed to fetch products! error: ", e);
            }
        };
        fetchProducts();
    },[]);

    return (
        <div className="catalogBox">
            <div className="leftSide">
                <ul className="productList">

                </ul>
            </div>
            <div className="rightSide">
                <div className="productsListBox">
                    {loadedProducts.length > 0 ? (
                        loadedProducts.map((product) => (
                            <Card key={product._id} product={product} />
                        ))
                    ) : (
                        <p>Načítavam produkty!</p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Catalog