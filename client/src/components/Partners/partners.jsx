import React, { useEffect, useState } from 'react'
import '../Partners/partners.css'

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
                loadedPartners.map((partner) => (
                    <div key={partner._id} className="partner">
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