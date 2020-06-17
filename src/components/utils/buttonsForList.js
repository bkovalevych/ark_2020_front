import React, {useEffect, useState} from 'react'
import add from '../../functions/add'
import deleteFunction from '../../functions/delete'
import {Modal} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLanguage} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";

export default function(props) {
    const icon = props.icon;
    const color = props.color;
    const fields = props.projection
    const delItems = props.filter;
    const path = props.name;
    const s = props.strings;
    const [fieldValues, setFieldValues] = useState({})
    const [showAdd, setShowAdd] = useState(false);
    return (
        <div>
            {!fields? "":
                <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showAdd}
                onHide={() => {
                    setShowAdd(false)
                }}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <FontAwesomeIcon icon={icon} size='2x' color={color}/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div style={{
                        display: "grid",
                        gap: '30px',
                        gridTemplateColumns: "180px 1fr"
                    }}>
                        {fields.map(val => (
                            <>
                                <label >
                                    {s[val]}
                                </label>
                                <input type='text'
                                       name={val}
                                       onInput={(e) => {
                                           fieldValues[val] = e.target.value;
                                           setFieldValues(fieldValues)
                                       }}/>
                            </>
                        ))}
                    </div>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        add(fieldValues, path)
                        setShowAdd(false);
                    }}>{s.add}</Button>
                </Modal.Footer>
            </Modal>
            <button onClick={() => {setShowAdd(true)}}>{s.add}</button>
            </>}
            {/*<button>{s.select}</button>*/}
            {/*<button>{s.unselect}</button>*/}
            {/*<button onClick={() => {*/}
            {/*    // deleteFunction(delItems)*/}
            {/*}}>{s.deleteSelected}</button>*/}
        </div>)
}