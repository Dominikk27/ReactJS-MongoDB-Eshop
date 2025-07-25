import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

import "./productDetailsPage.css";

const ProductDetailsPage = ({ onBack }) => {
    const { productID } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProductData = async() =>{
            try{
                const fetchData = await fetch(`http://localhost:3005/products/api/fetch/${productID}`);
                const productData = await fetchData.json();
                setProduct(productData);

            }catch(e){
                console.error("Failed to fetch product data! ERROR", e);
            }
            if(!productID){
                console.error("Product ID not found!");
                return;
            }
        }
        fetchProductData();
        console.log(product);
    }, [productID]);

    if (!product) return <p>Načítavam produkt</p>
    return (
        <div className="container">
            <div className="productDetailsBox">
                <div className="productDetailsLeftSide">
                    <div className="productImagesBox">
                        <div className="bigIMGBox">
                            <img src={product.productImages[0]} />
                        </div>
                        <div className="smallIMGsBox">
                            {product.productImages.length > 1 ?(
                                product.productImages.map((product) => (
                                   <div className="sImgBox" key={product._id}>
                                    <img src={product}/>
                                   </div> 
                                ))
                                
                            ): <div></div>}
                        </div>
                    </div>
                </div>
                <div className="productDetailsRightSide">
                    <div className="brandName">
                        STIHL
                    </div>
                    <div className="productName">
                        {product.productName}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage