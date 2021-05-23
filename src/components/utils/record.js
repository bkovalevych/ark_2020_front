import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Button from "react-bootstrap/Button";
import add from "../../functions/add";
import {faRecordVinyl, faPlay, faStop} from "@fortawesome/free-solid-svg-icons";
import './record.css';
import io from 'socket.io-client';
import Saver from './saver';


export default function(props) {
    const show = props.show;
    const socket = io('http://localhost:5000');
    const setShow = props.setShow;
    let isDrag = false;
    let zeroPos = {x: 0, y: 0};
    let elem;
    let startAngle = 0;
    let shoulder = 1;
    let interval = null;
    let curData = {data:[0, 0, 0, 0]};

    useEffect(() => {
        if (interval == null) {
            interval = setInterval(() => {
                if (document.querySelector('#clawOn') == null) {
                    return;
                }
                let values = [document.querySelector('#clawOn').checked? 120: 0];
                for (let i = 1; i < 4; ++i) {
                    let elem = document.querySelector('#rotation' + (i).toString());
                    let val = parseInt(elem.value);
                    if (isNaN(val)) {
                        elem.value = '0';
                        val = 0;
                    }
                    values.push(val)
                }
                socket.emit('arm', values);
                curData.data = values;
                //console.log(values);
            }, 200);
        }
        return () => {
            if (interval != null) {
                clearInterval(interval);
            }
        }
    })
    const angleDiv = () => {
        let txt = elem.style.transform;
        let cut = txt.slice(txt.indexOf('(') + 1, txt.indexOf('deg'))
        return parseFloat(cut);
    }



    const getDist = (point) => {
        return Math.sqrt(point.x * point.x  + point.y * point.y);
    }

    const getAngle = (zero, next) => {
        let a =  {x: 1, y: 0};
        let b = {x: next.x - zero.x, y: next.y - zero.y};
        let angleCos = (a.x * b.x + a.y * b.y) / getDist(a) / getDist(b);
        let plus = 0;
        if (angleCos - 5 > Math.PI) {
            plus = 180;
        }
        return Math.floor(Math.acos(angleCos) / Math.PI * 180) + plus;
    }
    const startDrag = (e) => {
        elem = e.target;
        isDrag = true;
        let x = e.screenX;
        let y = e.screenY;

        startAngle = angleDiv();
        let lastAngle = startAngle * Math.PI / 180;
        zeroPos.x = x - (e.nativeEvent.offsetX * Math.cos(lastAngle));
        zeroPos.y = y - (e.nativeEvent.offsetX * Math.sin(lastAngle));
        shoulder = e.nativeEvent.offsetX / 150;
    }


    const onDrag = (e) => {
        if (!isDrag) {
            return;
        }
        let current = {};
        current.x = e.screenX;
        current.y = e.screenY;
        let lastAngle = getAngle(zeroPos, current);
        let finalVal = Math.floor(lastAngle - (1 - shoulder) * (lastAngle - startAngle));
        let input = document.querySelector("#" + elem.dataset['datahandler'])
        if (elem.id === 'innerHand') {
            input.value = 156 - finalVal< 0?  0: 156 - finalVal;
        } else {
            input.value = finalVal;
        }
        elem.style.transform = `rotate(${-finalVal}deg)`;
        startAngle = lastAngle;
    }
    const handleDataInput = (e) => {
        let el = document.querySelector("#" + e.target.dataset['datahandler'])
        let val = parseInt(e.target.value);
        if (el.id === 'innerHand') {
            el.style.transform = `rotate(${val - 156}deg)`
        } else {
            el.style.transform = `rotate(${-val}deg)`
        }

    }
    const handleYRotation = (e) => {
        let el = document.querySelector("#" + e.target.dataset['datahandler'])
        let val = parseInt(e.target.value);
        el.style.transform = `rotateX(50deg) rotateZ(${-val - 90}deg)`;
    }

    const finishDrag = (e) => {
        isDrag = false;
    }

    return (<Modal
        onMouseMove={onDrag} onMouseUp={finishDrag}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
        onHide={() => {
            setShow(false)
        }}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                <FontAwesomeIcon icon={faRecordVinyl} size='2x' color={'black'}/>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body >
            <Saver currentData={curData} id={props.id}/>
            <div style={{
                display: "grid",
                gap: '10px',
                gridTemplateColumns: "1fr 120px"
            }}>
                <div className="area" >
                    <div data-datahandler='rotation2'
                         id="outerHand" style={{
                             transformOrigin: '0 7px', transform: "rotate(0rad)"
                         }} className="stick" onMouseDown={startDrag}>
                        <div data-datahandler='rotation1' id="innerHand"
                             onMouseMove={onDrag} className="stick" style={{
                            transformOrigin: '0 7px',
                            transform: "rotate(-156deg)"
                        }}>
                            <div id="claw" onClick={(e) => {
                                let el = document.getElementById('clawOn');
                                el.checked = !el.checked
                                if (el.checked) {
                                    e.target.style.height = "10px";
                                } else {
                                    e.target.style.height = "20px";
                                }
                            }}>

                            </div>
                        </div>
                    </div>
                    <div id="disk">
                        <div/>
                    </div>
                </div>
                <div style={{
                    display: "grid",
                    gap: '10px',
                    gridTemplateColumns: "70px 1fr",
                    height: '100px'
                }}>
                    <label htmlFor="rotation1">Rotation 1</label>
                    <input style={{height: "20px"}} step='2' data-datahandler="innerHand" onInput={handleDataInput} type="number" min="0" max="180" id="rotation1"/>
                    <label htmlFor="rotation2">Rotation 2</label>
                    <input style={{height: "20px"}} step='2' data-datahandler="outerHand" onInput={handleDataInput} type="number" min="0" max="180" id="rotation2"/>
                    <label htmlFor="rotation1">Rotation 3</label>
                    <input style={{height: "20px"}} step='2' data-datahandler="disk" type="number" min="0" max="180" id="rotation3" onInput={handleYRotation}/>
                    <label htmlFor="clawOn">Claw</label>
                    <input type="checkbox" id="clawOn" onChange={(e) => {
                        let doc = document.getElementById('claw');
                        console.log(e.target.checked);
                        if (e.target.checked) {
                            doc.style.height = "10px";
                        } else {
                            doc.style.height = "20px";
                        }
                    }}/>
                </div>


            </div>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => {
                setShow(false);
            }}>{props.strings.record}</Button>
        </Modal.Footer>
    </Modal>)
}