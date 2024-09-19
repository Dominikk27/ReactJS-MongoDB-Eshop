import React from 'react'
import '../Partners/partners.css'

import stihl from '../Partners/images/stihl.png'
import cubCadet from '../Partners/images/cubcadet.png'
import mtd from '../Partners/images/mtd.png'
import DAKR from '../Partners/images/DAKR.jpg'
import wolfGarten from '../Partners/images/wolfgarten.png'
import supa from '../Partners/images/supa.png'

const Partners = () => {
  return (
    <div className="partnersContainer">
        <div className="header">
            <h2>Partneri</h2>
        </div>
        <div className="partners">
            <div className="partner">
                <img src={stihl} alt="" />
            </div>
            <div className="partner">
                <img src={mtd} alt="" />
            </div>
            <div className="partner">
                <img src={supa} alt="" />
            </div>
            <div className="partner">
                <img src={wolfGarten} alt="" />
            </div>
            <div className="partner">
                <img src={DAKR} alt="" />
            </div>
            <div className="partner">
                <img src={cubCadet} alt="" />
            </div>
        </div>
    </div>
  )
}

export default Partners