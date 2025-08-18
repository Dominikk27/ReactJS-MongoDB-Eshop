import { FaUser } from "react-icons/fa";

import './dashboardCard.css'

const DashboardValueCard = ({title, description, value}) => {

    return (
    <div className="dashboardValueCardBox">
        <div className="cardNameBox">
            <FaUser className='icon'/>
            <h3 className="dashboardCardName">
                {title}
            </h3>
        </div>
        <div className="cardContentBox">
            <h1 className="cardStatValue">
                {value}
            </h1>
        </div>
        <div className="cardFooterBox">
            <p className="cardDescriptionText">
                {description}
            </p>
        </div>
    </div>
    )
}

export default DashboardValueCard