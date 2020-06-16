import React, {useEffect, useState} from "react";
import {faChargingStation} from '@fortawesome/free-solid-svg-icons'
import Elements from "../elements/elements";
import './controllers.css';
import io from 'socket.io-client';
import {useCookies, withCookies} from 'react-cookie';
import axios from 'axios';

const socket = io("https://bee-hive-bit-server.herokuapp.com");



function getConfiguration() {

    //axios.get('')
}

export default withCookies(function (props) {
    const projectionAdd = ["ssid", "password", ""];

    const [controllers, setControllers] = useState(null);
    const [onlineControllers, setOnlineControllers] = useState({});
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
    const writeOnlineControllers = () => {
        if (!onlineControllers || Object.keys(onlineControllers).size === 0) {
            return "You dont have any controller online";
        }
        return Object.keys(onlineControllers).map((key, index) => <div key={index}>
            <p>id {onlineControllers[key]._id.toString()}</p>
            <p>registered {onlineControllers[key].registered.toString()}</p>
            <p>socketId {onlineControllers[key].idSocket}</p>
        </div>)
    }
    const writeControllers = () => {
        if (!controllers || controllers.size === 0) {
            return "You dont have any controller";
        }
        return Object.keys(controllers).map((key, index) => <div key={index}>
            <p>id {controllers[key]._id.toString()}</p>
            <p>registered {controllers[key].registered.toString()}</p>
        </div>)
    }
    useEffect(() => {
        if (controllers == null) {
            axios.get("https://bee-hive-bit-server.herokuapp.com/iot").then(resp => {
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
            <div className="onlineControllers">
                {writeOnlineControllers()}
            </div>
            <div className="controllers">
                {writeControllers()}
            </div>

        </>
    )
})