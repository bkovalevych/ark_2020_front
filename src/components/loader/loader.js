import React from 'react';
import './loader.css'

function r(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}



export default class Loader extends React.Component{
    constructor(props){
        super(props);
        this.state = {intervalId: null, ready: false};

        this.scales = [];
        this.children = [];
        for (let i = 0; i < 40; ++i) {
            this.scales.push(1);
            this.children.push(<div className="bar"/>)
        }
        this.op = -1;
        this.splash = this.splash.bind(this);
        this.setVals = this.setVals.bind(this);
    }

    splash() {
        //0.5 - 2.5  50-250
        let last = this.scales[this.scales.length - 1] * 100;
        this.scales.shift();

        if (last <= 50) {
            this.op = r(1, 5);
        }
        if (last >= 249) {
            this.op = -r(1, 5);
        }
        this.scales.push((last + this.op * 10) / 100);
    }

    setVals() {
        this.splash();
        let domElem = document.getElementsByClassName('loader')[0];
        for(let i = 0; i < this.scales.length; ++i) {
            let t = //"translateZ(" + (scales[i] * 2 - 2) + "em)
                "scaleY("+this.scales[i]+ ")";
            let val = this.scales[i] * 100;
            let color = "rgb(" +
                (val * val) % 255 + ", " +
                (val * 2 ) % 255 + ", " +
                val + ")";
            domElem.children[i].style.setProperty("background", color);
            domElem.children[i].style.setProperty("transform", t)
        }
    }

    componentWillUnmount() {
        clearInterval(this.id);
    }

    componentDidMount(): void {

        let h = window.innerHeight;
        let w = window.innerWidth;
        let c = document.getElementsByClassName("loader")[0];
        if (c && !this.state.intervalId) {
            // c.style.transform = `translateX(${w / 2 - 250}px) translateY(${h / 2 - 250}px)`;

            this.id = setInterval(this.setVals, 200);
        }

    }

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {
        let loader = (props) => {

            return (<div className='loader'>{props.children}</div>)
        };

        return (
            <div className="over">
                Waiting
                {loader({children: this.children})}
            </div>

        )
    }
}