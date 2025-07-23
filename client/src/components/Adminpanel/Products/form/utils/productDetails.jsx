import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';

import { productDetailSchema } from "../utils/productSchemas";

import '../popUpForms.css';

export default function ProductDetailsForm({ productType, productDrive, productDetails }) {
  const { register, setValue } = useFormContext();

  if (!productType || !productDrive) return null;


  const fieldsByCategory = productDetailSchema[productType]?.[productDrive];
  if (!fieldsByCategory) return null;


  return (
    <div className="dynamic-form formBody">
      {Object.entries(fieldsByCategory).map(([category, fields]) => (
        <div key={category} className="categoryGroup">
          <h4 className="categoryTitle">{category}</h4>
          {fields.map(({ key, label, type }) => (
            <div key={key} className="inputBox">
              <label htmlFor={key}>{label}</label>
              <input
                id={key}
                type={type}
                defaultValue={productDetails?.[key] || ""}
                {...register(`productDetails.${key}`)} 
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}