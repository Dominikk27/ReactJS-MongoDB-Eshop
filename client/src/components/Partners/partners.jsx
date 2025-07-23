import React, { useEffect, useState } from 'react'
import '../Partners/partners.css'

import stihl from '../Partners/images/stihl.png'
import cubCadet from '../Partners/images/cubcadet.png'
import mtd from '../Partners/images/mtd.png'
import DAKR from '../Partners/images/DAKR.jpg'
import wolfGarten from '../Partners/images/wolfgarten.png'
import supa from '../Partners/images/supa.png'

const Partners = () => {

    const [loadedPartners, setLoadedPartners] = useState([]);

    useEffect(() =>{
        const fetchPartners = async () =>{
            try{
                const partnersRes = await fetch("http://localhost:3005/client/visuals/partners");
                const partnersData = await partnersRes.json();

                setLoadedPartners(partnersData);

            }catch (e){
                console.error("Fetching partners failed! error: ", e);
            }
        };

        fetchPartners();
    }, []);

    return (
    <div className="partnersContainer">
        <div className="header">
            <h2>Partneri</h2>
        </div>
        <div className="partners">
            {loadedPartners.length > 0 ? (
                loadedPartners.map((partner, index) => (
                    <div className="partner">
                        <img src={partner.partnerLogo} alt="" />
                    </div>
                ))
            ):
            <p>Načítavam Partnerov!</p>
            }
        </div>
    </div>
    )
}

export default Partners