import { useState } from 'react';
import './PastItem.css';

const PastItem = ({img, keywords}) => {

    return (
        <div className='PastItem'>
        <img src={img}/>
        <div className='pastKeywordsContainer'>
            {keywords && keywords.map((o) => {
                return <p>{o}</p>;
            })}
        </div>
    </div>
    );
}

export default PastItem;