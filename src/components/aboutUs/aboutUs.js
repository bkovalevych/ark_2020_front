import * as React from 'react';
import './aboutUs.css';

function AboutUs(props) {
    return (
        <div className='textNormal'>
            <p>
                {props.strings.mainInfo}
            </p>
        </div>
    )
}

export default AboutUs;