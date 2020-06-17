import React from 'react';
import './Loader.css';

export default () => {
    return (
        <div className='loader-wrapper'>
            <div className="lds-ring">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}