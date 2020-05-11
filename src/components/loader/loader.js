import React from 'react';
import './loader.css'

function r(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



export default class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {scales:[0.6, 0.3, 0.5,0.6, 0.3, 0.5, 0.8, 0.6, 0.3, 0.5,0.6, 0.3, 0.5,]};
    }





    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {


        return (

            <div className="over">
                {this.state.scales.map((val, index) => (
                    <div style={{
                        transformOrigin: `100px 50px`,
                        width: '200px',//`${(Math.abs(val)) * 300}px`,
                        transform: `rotateY(${360 * val}deg)`,
                        borderRadius: '200px',
                        height:`100px`,
                        backgroundColor: `rgba(90, ${Math.ceil(255 *(1 - val))}, ${Math.ceil(255 *val)}, 0.8)`,
                        position: 'absolute',

                    }}/>))}
            </div>


        )
    }
}