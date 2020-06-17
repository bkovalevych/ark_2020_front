import React, {useState} from "react"
import {Modal, Tab, Tabs} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChargingStation} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import add from "../../functions/add";
import "../controllers/controllers.css"
export default function(props) {
    if (props.controllers == null) {
        return '';
    }
    const data = props.controllers[props.selectedItem];
    const [schedule, setSchedule] = useState(data? data.foodSchedule: {});
    const show = props.show;
    const setShow = props.setShow;
    const [fieldValues, setFieldValues] = useState({});
    if (data && data.temperature) {
        fieldValues['temperature'] = data.temperature? data.temperature: 0;
        fieldValues['humidity'] = data.humidity? data.humidity: 40;
    }
    const [temperature, setTemperature] = useState(fieldValues.temperature);
    const [humidity, setHumidity] = useState(fieldValues.humidity);
    const [idCage, setIdCage] = useState(data && data.idCage? data.idCage: "");
    const s = props.strings;
    const [specification, setSpecification] = useState(data && data.specification? data.specification: "innerController")
    const timeWidget = () => {
        let result = [];
        for (let hour = 0; hour < 24 * 7; ++hour) {
            let className = "cellTime" + (schedule[hour]? " filledCell": "");
            result.push(<div className={className} onClick={
                () => {
                    console.log(hour);
                }
            }/>)
        }
        return result;
    }
    return (
<>
    <Modal
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
                <FontAwesomeIcon icon={faChargingStation} size='2x' color="#3cdb47"/>
                <p>{data?data._id: "hz"}</p>
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
            <div style={{
                display: "grid",
                gap: '30px',
                gridTemplateColumns: "180px 1fr"
            }}>
                <label >idCage</label>
                <input type='text'
                       name='idCage'
                       value={idCage}
                       onChange={(e) => {
                           fieldValues['idCage'] = e.target.value;
                           setIdCage(e.target.value);
                       }}/>
            </div>
                <Tabs
                    id="controlled-tab-example"
                    activeKey={specification}
                    onSelect={(k) => setSpecification(k)}
                >
                    <Tab eventKey="innerController" title="innerController">
                        <div style={{
                            display: "grid",
                            gap: '30px',
                            gridTemplateColumns: "180px 1fr"
                        }}>
                            <label >Temperature</label>
                            <input type='number'
                                   min={-5}
                                   step='0.1'
                                   max={40}
                                   name='temperature'
                                   value={temperature}
                                   onInput={(e) => {
                                       fieldValues['temperature'] = e.target.value;
                                       setTemperature(e.target.value)
                                   }}/>
                            <label >Humidity</label>
                            <input type='number'
                                   name='humidity'
                                   min={0}
                                   max={100}
                                   step='0.1'
                                   value={humidity}
                                   onInput={(e) => {
                                       fieldValues['humidity'] = e.target.value;
                                       setHumidity(e.target.value)
                                   }}/>
                        </div>
                    </Tab>
                    <Tab eventKey="outerController" title="outerController">
                        <p>This controller will be outside. Remote control is not enabled</p>
                    </Tab>
                    <Tab eventKey="feedSystem" title="feedSystem">
                        <p>food</p>
                        <div className="bigTable">
                            <div className="days">{
                                ["", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
                                    .map(value => <div className="cellTime header">{value !== ""? props.strings[value]: ""}</div>)

                            }</div>
                            <div className="time">
                                <div className="timeHeader">{
                                    ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]
                                        .map(value => <div className="cellTime header">{value}</div>)
                                }</div>
                                <div className="outerWidget">
                                    {timeWidget()}
                                </div>
                            </div>
                        </div>
                    </Tab>
                </Tabs>

            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="primary" onClick={() => {
                fieldValues.specification = specification;
                fieldValues.idUser = props.user._id;
                if (data && data.idSocket)
                    fieldValues.idSocket = data.idSocket;
                if (data)
                    fieldValues._id = data._id;
                props.transfer(fieldValues);
                setShow(false);
            }}>{s.add}</Button>
        </Modal.Footer>
    </Modal>
    <button onClick={() => {if (props.controllers[props.selectedItem])setShow(true)}}>{s.add}</button>
</>
    )
}