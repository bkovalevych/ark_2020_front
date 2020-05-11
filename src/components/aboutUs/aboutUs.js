import * as React from 'react';
import './aboutUs.css';

function AboutUs(props) {
    return (
        <div className='textNormal'>
            {props.strings.mainInfo}
            <br/>
        </div>
    )
}

export default AboutUs;