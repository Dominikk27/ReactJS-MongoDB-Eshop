import React from 'react'

import { useForm, FormProvider } from 'react-hook-form';

import { FaFacebook, FaInstagram, FaGoogle, FaYoutube } from "react-icons/fa";

import "./socials.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { IoSchool } from 'react-icons/io5';

const Socials = () => {

    const defaultValues = {
        Instagram: '',
        Facebook: '',
        Youtube: '',
        Google: '',
        Twitter: '',
    }
    const {register, watch, handleSubmit, reset} = useForm({defaultValues});
    const [socialsChanged, setSocialsChanged] = useState(false);

    const watchedSocials = watch();
    useEffect(()=>{
        const isSocialInputsChanged = Object.entries(watchedSocials).some(([key, value]) => value !== defaultValues[key]);
        setSocialsChanged(isSocialInputsChanged);
    }, [watchedSocials]);


    const onSubmit = async (socialData) =>{
            try{
                const res = await fetch("http://localhost:3005/adminpanel/socials/updateSocials",
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(socialData)
                });
                if(!res.ok){
                    throw new Error("Socials update failed!");
                }

                const result = await res.json();
                console.log("Socials has been successfully updated! ", result)
                reset(socialData);
                setSocialsChanged(false);
            }catch(e){
                console.error("Socials error: ", e);
            }

    }

    useEffect(() =>{
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="socialsBox">
            <h4 className='categoryName'>Socials</h4>
            <div className="socialsInputsContainer">
                <div className="socialInputWrapper">
                    <div className="iconBox">
                        <FaFacebook className="socialIcon" />
                    </div>
                    <input type="text" className="socialInput" placeholder="Facebook link" {...register('Facebook')}/>
                </div>
                <div className="socialInputWrapper">
                    <div className="iconBox">
                        <FaInstagram className="socialIcon" />
                    </div>
                    <input type="text" className="socialInput" placeholder="Instagram link" {...register('Instagram')}/>
                </div>
                <div className="socialInputWrapper">
                    <div className="iconBox">
                        <FaGoogle  className="socialIcon" />
                    </div>
                    <input type="text" className="socialInput" placeholder="Google link" {...register('Google')}/>
                </div>
                <div className="socialInputWrapper">
                    <div className="iconBox">
                        <FaYoutube  className="socialIcon" />
                    </div>
                    <input type="text" className="socialInput" placeholder="YouTube link" {...register('Youtube')}/>
                </div>
            </div>
            {socialsChanged && (
                <div className="ap_ActionButtonsBox">
                    <button className="cancelChangesBTN BTN" onClick={()=> reset()}>
                        Cancel Changes
                    </button>
                    <button className="submitChangesBTN BTN" type="submit">
                        Submit Changes
                    </button>
                </div>
            )}
        </form>
    )
}

export default Socials