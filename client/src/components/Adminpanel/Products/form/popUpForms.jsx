import React from 'react'

import "../form/popUpForms.css"

import { IoClose } from "react-icons/io5";


function Popup({showForm}) {

  console.log({showForm})

  const AddProduct = () => (
    <div className="header">
      <div className="textHeader">
        <h3>Pridať produkt</h3>
      </div>
      <div className="closeBTN">
        <IoClose className='icon' />
      </div>

    </div>
  )

  const EditProduct = () => (
    console.log("Uprav Produkt!")
  )

  const CloseForm = () => (
    console.log("Zavri Produkt!")
  )

  function ActiveForm() {
    switch(showForm){
      case 'addProduct':
        console.log("pridavam formular")
        return <AddProduct />;
      case 'editProduct':
        return <EditProduct />;
      default:
        return null;
    }
  };

  if (!showForm){
    return null;
  }

  return (
    <div className="popUpBox">
      <div className="popUpInner">
        {ActiveForm()}
      </div>
    </div>
  )
}

export default Popup