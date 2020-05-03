import React from 'react';
import {withRouter} from 'react-router-dom'
import {useParams} from "react-router";
import Farms from '../farms/farms'
export default withRouter(function(props) {
    return (<Farms strings={props.strings} collectionName={'/cage'}/>)
})