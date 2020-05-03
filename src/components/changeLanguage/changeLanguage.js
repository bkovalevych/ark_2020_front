import React, {useState} from 'react';
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLanguage} from '@fortawesome/free-solid-svg-icons'


export default function(props) {
    const save = () => {
        props.setLanguage(current)
        props.setShowLanguage(false)
    };
    const [current, setCurrent] = useState(props.lan);
    return (
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={props.showLanguage}
            onHide={() => {
                setCurrent(props.lan);
                props.setShowLanguage(false)
            }}
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <FontAwesomeIcon icon={faLanguage}/>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <label >
                    <input type='radio'
                           id='en'
                           name='lan'
                           value='en'
                           checked={current === 'en'? 'checked': ''}
                           onClick={() => {
                               setCurrent('en')
                           }}/>
                    english
                </label>
                <br/>
                <label >
                    <input type='radio'
                           id='ua'
                           name='lan'
                           value='ua'
                           checked={current === 'ua'? 'checked': ''}
                           onClick={
                               () => {
                                   setCurrent('ua')
                               }
                           }/>
                    українська
                </label>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={() => {save()}}>{props.strings.save}</Button>
            </Modal.Footer>
        </Modal>
    )
}