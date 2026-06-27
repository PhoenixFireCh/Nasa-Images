import { useState } from 'react';
import './Attribute.css'

const Attribute = ({label, click}) => {
    return (
        <>
            <button value={label} onClick={click}>{label}</button>
        </>
    );
};

export default Attribute;