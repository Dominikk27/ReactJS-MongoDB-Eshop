import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom';

import { IoChevronBackOutline } from "react-icons/io5";
import { FaStar, FaRegStar, FaPercentage } from "react-icons/fa";
import { MdClose } from "react-icons/md";

import Popup from '../../../Adminpanel/Products/form/popUpForms';

import { productDetailSchema } from '../../../Adminpanel/Products/form/utils/productSchemas';

import "./productDetailsPage.css";

const ProductDetailsPage = ({ onBack }) => {
    const [activeImage, setActiveImage] = useState(null);
    const { productID } = useParams();
    const [product, setProduct] = useState(null);

    const [showForm, setShowForm] = useState(null);
    const handleReservationForm = (productData) => {
        setShowForm(null);
        triggerSuccessPopup();
    }

    const [showPopupMessage, setShowPopupMessage] = useState(null);
    const triggerSuccessPopup = () => {
        setShowPopupMessage(true);
        setTimeout(() => {
            setShowPopupMessage(false);
        }, 4000);
    };


    const navigate = useNavigate();
    const handleClickOnBack = () => {
        navigate(-1);
    }

    useEffect(() => {
        const fetchProductData = async() =>{
            try{
                const fetchData = await fetch(`http://localhost:3005/products/api/fetch/${productID}`);
                const productData = await fetchData.json();
                setProduct(productData);
                setActiveImage(productData.productImages[0]);

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
    const productSchema = productDetailSchema[product.productType]?.[product.productDrive]
    console.log(productSchema);
    console.log(product);

    return (
        <div className="container">
            <div className="headerBox">
                <div className="backButton" onClick={handleClickOnBack}>
                    <IoChevronBackOutline className='icon'/> <span>Naspäť</span>
                </div>
            </div>
            <div className="productDetailsBox">
                <div className="productDetailsLeftSide">
                    <div className="productImagesBox">
                        <div className="productCodeBox">
                            <p>KOD PRODUKTU: {product.productCode}</p>
                        </div>
                        <div className="bigIMGBox">
                            {product.onSale ?
                                <div className="floatingTag">
                                    <FaPercentage className='icon'/> <p className='tagType'>Zľava</p>
                                </div> : null}
                            <img src={activeImage} />
                        </div>
                        <div className="smallIMGsBox">
                            {product.productImages.length > 1 ?(
                                product.productImages.map((product) => (
                                   <div 
                                    className={`sImgBox ${product === activeImage ? 'active' : 'inactive'}`} 
                                    key={product._id} 
                                    onClick={() => setActiveImage(product)}>
                                    <img src={product}/>
                                   </div> 
                                ))
                                
                            ): <div></div>}
                        </div>
                    </div>
                </div>
                <div className="productDetailsRightSide">
                    <div className="productNameBox">
                        <h2>{product.productName}</h2>
                    </div>
                    <div className="productDetailsRow">
                        <div className="productDescriptionBox">
                            <p>
                                {product.productDescription}
                            </p>
                        </div>
                        <div className="descriptionTableBox">
                            {Object.entries(productSchema).map(([sectionName, fields]) => (
                                <div className="sectionName">
                                    <h4>{sectionName}</h4>
                                    <table className='productDetailsTable'>
                                        <tbody>
                                            <tr>
                                                <td className="paramNameCell">Pohon</td>
                                                <td className="paramValueCell">{product.productDrive}</td>
                                            </tr>
                                            {Array.isArray(fields) && fields.map(({ key, label }) => (
                                            <tr key={key}>
                                                <td className="paramNameCell">{label}</td>
                                                <td className="paramValueCell">{product.productDetails?.[key]}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="priceBoxDetails">
                        <div className="priceBoxHeader">
                            <p>Cena</p>
                        </div>
                        <div className={product.onSale ? 'priceBox onSale' : 'priceBox'}>
                            <div className="defaultPriceBox">
                                <div className={product.onSale ? 'diagonal-line' : ''}>
                                    <h2 className='defaultProductPrice'>{product.defaultPrice}<span className='currency'> €</span></h2>
                                </div>
                            </div>
                            {product.onSale ? 
                                <div className="onSalePriceBox">
                                    <h2 className='onSaleProductPrice'>{product.onSalePrice}<span className='currency'> €</span></h2>
                                </div> :null}
                        </div>
                    </div>
                    <div className="buttonsBox">
                        <button className='btnToReserve' onClick={() => {setShowForm('reserveProduct')}}>Rezervovať produkt</button>
                    </div>
                </div>
            </div>
            {showForm === 'reserveProduct' && (
                <Popup showForm={showForm} setForm={setShowForm} activeProduct={product} onSuccess={handleReservationForm}/>
            )}
            {showPopupMessage && (
                <div className="popupMessageBox">
                    <div className="closePopupMessage"><MdClose /></div>
                    <div className="popupMessageHeader">
                        <h5>Rezervácia úspešne prijata!</h5>
                    </div>
                    <div className="popupMessageContent">
                        <p>Vášu žiadosť o rezerváciu produktu sme úspešne prijali!</p> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetailsPage
