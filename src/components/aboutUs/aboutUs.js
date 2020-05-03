import * as React from 'react';
import {Button, Jumbotron} from 'react-bootstrap';
import './aboutUs.css';
import one from "../../res/img/one.jpg"
import two from "../../res/img/two.jpg"
import three from "../../res/img/three.jpg"
import "./aboutUs.css"
import {useState} from "react";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import {CardGroup, Modal} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Badge from "react-bootstrap/Badge";
import Table from "react-bootstrap/Table";
function AboutUs(props) {
    const [off, setOff] = useState(true);
    const [currentUser, setUser] = useState(null);
    const [showUser, setUserShow] = useState(false);
    const [showMedia, setShowMedia] = useState(false);
    const [currentMedia, setCurrentMedia] = useState(null);
    const switchAll = () => {
        setOff(!off);
    };

    const rUsers = () => {
        if (props.users) {
            let arr = [];
            for(let key in props.users) {
                let elem = props.users[key];
                arr.push(<Card size="sm" key={key} className="myHover" onClick={() => {setUser(elem); setUserShow(true)}}>
                    <Card.Header> <i className="fa fa-user"/> {elem.nickname} </Card.Header>
                </Card>)
            }
            return arr;
        } else {
            return "";
        }
    };
    const rMedias = () => {
        if (props.move) {
            let arr = [];
            for(let key in props.move) {
                let elem = props.move[key];
                arr.push(<Card size="sm" key={key} className="my" onClick={() => {setCurrentMedia(elem); setShowMedia(true)}}>
                    <Card.Header> <i className="fa fa-barcode"/> {elem.name} </Card.Header>
                </Card>)
            }
            return arr;
        } else {
            return "";
        }
    }
    return (
        <div className='textNormal'>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showUser}
                onHide={() => {setUserShow(false)}}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <i className="fa fa-user fa-2x"/>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>{currentUser? currentUser.nickname: ""}</h4>
                    <Table size="lg">
                        <tr>
                            <Badge variant="primary" style={{marginLeft: "20px", marginRight: "20px"}}>
                                {currentUser? currentUser.followersNumber: 0} followers
                            </Badge>
                            <Badge variant="info" style={{marginLeft: "20px", marginRight: "20px"}}>
                                {currentUser? currentUser.subscribesNumber: 0} subscribes
                            </Badge>
                            <Badge variant="secondary" style={{marginLeft: "20px", marginRight: "20px"}}>
                                created at{currentUser?
                                `${new Date(currentUser.date).getDate()}/${new Date(currentUser.date).getMonth() + 1}/${new Date(currentUser.date).getFullYear()}`: 0}
                            </Badge>
                            {(currentUser && (new Date().valueOf() - new Date(currentUser.date).valueOf() < 1000 * 60 * 60 * 24 * 30))}
                            <Badge variant="danger" style={{marginLeft: "20px", marginRight: "20px"}}>
                                New
                            </Badge>
                        </tr>
                        <tr>
                            Like go around rules and break all.
                        </tr>
                    </Table>



                </Modal.Body>
            </Modal>
            <Modal
                size="md"
                md={4}
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showMedia}
                onHide={() => {setShowMedia(false)}}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <i className="fa fa-barcode"/>
                        <Button size="sm" style={{marginLeft: "50px"}}><i className="fa fa-save"/></Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 >{currentMedia? currentMedia.name: ""}</h4>
                    <Table size="lg">
                        <tr>
                            <Badge variant="primary" style={{marginLeft: "20px", marginRight: "20px"}}>
                                {currentMedia? currentMedia.uses_count: 0} uses
                            </Badge>
                            <Badge variant="info" style={{marginLeft: "20px", marginRight: "20px"}}>
                                {currentMedia? `${new Date(currentMedia.date).getDate()}/${new Date(currentMedia.date).getMonth() + 1}`: ""}
                            </Badge>
                            {currentMedia? new Date().valueOf() - new Date(currentMedia.date).valueOf() < 1000 * 60 * 60 * 24?
                            <Badge variant="danger" style={{marginLeft: "20px", marginRight: "20px"}}>
                                New
                            </Badge>: "": ""
                            }
                        </tr>
                        <tr>
                            {currentMedia? currentMedia.description: ""}
                        </tr>
                    </Table>



                </Modal.Body>
            </Modal>
            <p>
                {props.strings.mainInfo}
            </p>
        </div>
    )
}

export default AboutUs;