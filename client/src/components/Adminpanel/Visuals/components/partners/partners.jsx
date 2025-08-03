import React, { useEffect, useState } from 'react'

import "../partners/partners.css";

import { IoClose } from "react-icons/io5";
import { FaUpload } from "react-icons/fa";

const PartnersSettings = () => {
    const [localPartners, setLocalPartners] = useState([]);
    const [loadedPartners, setLoadedPartners] = useState([]);
    const [currentPartners, setCurrentPartners] = useState([]);

    /* FETCH PARTNERS FROM DB */
    useEffect(()=> {
    const fetchPartners = async () => {
        try {
        const partnersRes = await fetch("http://localhost:3005/adminpanel/visuals/partners");
        const partnersData = await partnersRes.json();

        setCurrentPartners(partnersData);
        setLoadedPartners(partnersData);
        }catch(e){
        console.error("Failed to fetch any partners logo! error: ", e);
        }
    }
    fetchPartners();
    }, []);

    /* CANCEL CHANGES */
    const CancelChanges = () => {
    setCurrentPartners(loadedPartners);

    localPartners.forEach(image => URL.revokeObjectURL(image.preview));
    setLocalPartners([]);
    };

    const SaveChanges = async () => {
    try{
        const formData = new FormData();
        const removedIDs = loadedPartners
        .filter(lp => !currentPartners
            .some(cp => cp._id === lp._id))
            .map(partner => partner._id);

        if(removedIDs.length === 0 && localPartners.length === 0){
        console.log("No partners to Update!");
        return;
        }

        formData.append("removedIDs", JSON.stringify(removedIDs));
        localPartners.forEach((partner) => {
        formData.append("partnerLogo", partner.file);
        })


        const res = await fetch("http://localhost:3005/adminpanel/visuals/partners/update",{
        method: "PUT",
        body: formData
        });

        if(!res.ok){
        console.error("Server Error! Failed to Update Partners!");
        return;
        }

        localPartners.forEach(partner =>{
        URL.revokeObjectURL(partner.preview);
        })
        setLocalPartners([]);

        window.location.reload();


        console.log("Partners successfully updated!");

    }catch (e){
        console.log("Client Error: ",e);
        return;
    }
    }

    /* PARTNERS CHANGES */
    const PartnersChanged = () => {
    if (localPartners.length > 0) return true
    
    const removedPartners = loadedPartners.filter(loadedPartners =>
        !currentPartners.some(partner => partner._id === loadedPartners._id)
    );

    return removedPartners.length > 0;
    }

    /* PREVIEW LOCAL IMAGES */
    const handlePartnersImages = (e) => {
    const files = Array.from(e.target.files);
    const newPartner = files.map(file => ({
        file,
        preview: URL.createObjectURL(file)
    }));

    setLocalPartners(prev => [...prev, ...newPartner]);
    e.target.value = null;
    };

    /* REMOVE LOCAL IMG PREV */
    const RemoveLocalPartner = (index) => {
    setLocalPartners(prev => {
        const updated = [...prev];
        const removed = updated.splice(index, 1);

        if(removed?.preview){
        URL.revokeObjectURL(removed.preview);
        }
        return updated;
    });
    };

    /* REMOVE LOADED IMG PREV */
    const RemoveLoadedPartner = (index) => {
    setCurrentPartners(prev => {
        const updated = [...prev];
        updated.splice(index, 1);

        return updated;
    });
    };

    return (
        <div className="visualsPartnersBox">
            <h4 className='categoryName'>Partners</h4>
        <div className="visualsPartnersIMGBox">
            {(currentPartners && currentPartners.length > 0) || (localPartners && localPartners.length > 0) ? (
            <>
                {currentPartners.map((partner, index) => (
                <div className="partner" key={`old-${index}`}>
                    <img src={partner.partnerLogo} alt="partner logo" />
                    <IoClose className="removeIcon" onClick={() => RemoveLoadedPartner(index)}/>
                </div>
                ))}
                {localPartners.map((localPartner, index) => (
                <div className="partner" key={`local-${index}`}>
                    <img src={URL.createObjectURL(localPartner.file)} alt="partner logo" />
                    <IoClose className="removeIcon" onClick={() => RemoveLocalPartner(index)}/>
                </div>
                ))}
            </>
            ) : (
            <p>Neboli nájdení žiadni partneri</p>
            )}
            <div className='addPartnerImage'>
                <input 
                    id="file-input" 
                    type="file" 
                    name='partnerLogo' 
                    title='Partner Imagaes' 
                    accept='image/*' 
                    multiple
                    onChange={handlePartnersImages}
                />
                <label htmlFor="file-input">
                    <FaUpload className='uploadIcon' /> 
                    <span>Pridať partnera</span>
                </label>
            </div>
        </div>
        {PartnersChanged() && (
            <div className="ap_ActionButtonsBox">
                <button className="cancelChangesBTN BTN" onClick={CancelChanges}>
                    Cancel Changes
                </button>
                <button className="submitChangesBTN BTN" onClick={SaveChanges}>
                    Submit Changes
                </button>
            </div>
        )}
    </div>
  )
}

export default PartnersSettings