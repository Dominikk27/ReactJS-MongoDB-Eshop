import React, {useState, useEffect, useRef} from 'react'

import { useForm, FormProvider } from 'react-hook-form';

import { FaFacebook, FaInstagram, FaGoogle, FaYoutube } from "react-icons/fa";
import { IoSchool } from 'react-icons/io5';

import SocialInput from './socialInput';

import "./socials.css"

const Socials = () => {

    const socialMethods = useForm({
        defaultValues: {
            Instagram: '',
            Facebook: '',
            Youtube: '',
            Google: '',
            Twitter: '',
        }
    })

    const {register, watch, handleSubmit, reset} = socialMethods;
    const [socialsChanged, setSocialsChanged] = useState(false);
    const loadedData = useRef({});

    const watchedSocials = watch();
    useEffect(()=>{
        const timeout = setTimeout(() => {
        const isChanged = Object.entries(watchedSocials).some(
            ([key, value]) => value !== loadedData.current[key]
        );
        setSocialsChanged(isChanged);
    }, 0);

    return () => clearTimeout(timeout);
  }, [watchedSocials]);

    useEffect(() =>{
        const fetchSocialData = async () =>{
            try{
                const res = await fetch("http://localhost:3005/client/socials/getSocials");
                const data = await res.json();

                if(Array.isArray(data) && data.length > 0){
                    const transformData = data[0];
                    
                    const cleanedData = {
                        Facebook: transformData.Facebook || '',
                        Instagram: transformData.Instagram || '',
                        Youtube: transformData.Youtube || '',
                        Google: transformData.Google || '',
                        Twitter: transformData.Twitter || '',
                    };

                    loadedData.current = cleanedData;
                    reset(cleanedData);

                    console.log("data: ", transformData);

                }else{
                    console.log("Social data is empty!");
                }
            

            }catch(e){
                console.error("Failed to get socials data! error: ",e);
            }

        }
        fetchSocialData();
    },[reset]);


    const onSubmit = async (socialData) =>{
            try{
                const res = await fetch("http://localhost:3005/adminpanel/socials/updateSocials",
                {
                    method: 'PATCH',
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

    return (
        <FormProvider {...socialMethods}>
            <form onSubmit={handleSubmit(onSubmit)} className="socialsBox">
                <h4 className='categoryName'>Socials</h4>
                <div className="socialsInputsContainer">
                    <SocialInput name="Facebook" placeholder="Facebook link" Icon={FaFacebook} />
                    <SocialInput name="Instagram" placeholder="Instagram link" Icon={FaInstagram} />
                    <SocialInput name="Google" placeholder="Google link" Icon={FaGoogle} />
                    <SocialInput name="Youtube" placeholder="YouTube link" Icon={FaYoutube} />
                </div>
                {socialsChanged && (
                    <div className="ap_ActionButtonsBox">
                        <button className="cancelChangesBTN BTN" onClick={(e)=> { e.preventDefault(); reset(); }}>
                            Cancel Changes
                        </button>
                        <button className="submitChangesBTN BTN" type="submit">
                            Submit Changes
                        </button>
                    </div>
                )}
            </form>
        </FormProvider>
    )
}

export default Socials