import React from 'react';
import { useFormContext } from 'react-hook-form';

import "./socials.css";

const SocialInput = ({ name, placeholder, Icon }) => {
    const { register } = useFormContext();

    return (
        <div className="socialInputWrapper">
            <div className="iconBox">
                <Icon className="socialIcon" />
            </div>
            <input
                type="text"
                className="socialInput"
                placeholder={placeholder}
                {...register(name)}
            />
        </div>
    );
};

export default SocialInput;