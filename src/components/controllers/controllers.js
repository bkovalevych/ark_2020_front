import React, {useEffect, useState} from "react";
import {faChargingStation} from '@fortawesome/free-solid-svg-icons'
import Elements from "../elements/elements";
import './controllers.css';
import io from 'socket.io-client';
import {useCookies, withCookies} from 'react-cookie';
import axios from 'axios';
import SpecialButton from '../utils/buttonForRemote';
const socket = io(process.env.REACT_APP_API_URL);



function getConfiguration() {

    //axios.get('')
}

export default withCookies(function (props) {
    const projection = new Set(["specification", "registered", "idCage", "_id"]);
    const [controllers, setControllers] = useState(null);
    const [onlineControllers, setOnlineControllers] = useState({});
    const [showAdd, setShowAdd] = useState(false)
    const [selectedItem, selectItem] = useState(new Set());
    const transfer = (remoteData) => {
        socket.emit('remote', remoteData);
    }
    socket.on('iotOffline', (id) => {
        delete onlineControllers[id];
        let newList = Object.assign({}, onlineControllers);
        setOnlineControllers(newList);
    })
    useEffect(() => {
        if (props.user)
            socket.emit("configUser", {idUser: props.user._id})
    }, [props.user])
    socket.on('iotOnline', controller => {
        onlineControllers[controller.idSocket] = controller;
        let newList = Object.assign({}, onlineControllers);
        setOnlineControllers(newList);
    })


    useEffect(() => {
        if (controllers == null) {
            axios.get("/iot").then(resp => {
                let data = resp.data;
                if (data) {
                    let obj = {};
                    let online = {}
                    data.map(value => {obj[value._id] = value; if (value.idSocket) online[value.idSocket] = value});
                    setControllers(obj);
                    setOnlineControllers(online);
                }
            })
        }
    }, [controllers])


    return (
        <>
            <h1>Hello controllers</h1>



            <div>
                To configure your controller connect to controllers wi-fi
                <form>
                    <label>Ssid</label>
                    <input type="text"/>
                    <label>Password</label>
                    <input type="text"/>
                    <input type="submit" value="configure"/>
                </form>
            </div>
                <SpecialButton strings={props.strings}
                               selectedItem={selectedItem}
                               user={props.user}
                               transfer={transfer}
                               controllers={controllers}
                               show={showAdd}
                               setShow={setShowAdd}/>
                <Elements
                    projectionAdd={null}
                    projection={projection}
                    filter={null}
                    icon={faChargingStation}
                    collectionName={"/onlineControllers"}
                    setItem={selectItem}
                    selectedItems={selectedItem}
                    strings={props.strings}
                    color={"#3cdb47"}
                    outerElements={onlineControllers}
                />
                <Elements
                    projectionAdd={null}
                    projection={projection}
                    filter={null}
                    icon={faChargingStation}
                    collectionName={"/controllers"}
                    setItem={() =>{}}
                    selectedItems={new Set()}
                    strings={props.strings}
                    color={"#121312"}
                    outerElements={controllers}
                />

        </>
    )
})