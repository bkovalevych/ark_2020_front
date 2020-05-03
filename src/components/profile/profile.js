import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {GoogleLogin} from 'react-google-login';
import axios from "axios";
export default function(props) {
    const [nickname, setNickname] = useState(props.user? props.user.nickname : '');
    const [description, setDescription] = useState(props.user? props.user.description : '');
    const [edit, setEdit] = useState(false);
    const responseGoogle = (response) => {
        console.log(response)
    };
    return (<>
        <Card size="sm" sm={2}>
            <Card.Header>
                <GoogleLogin
                    clientId="698996094926-54843vcf6corbeq47f6iqpr1dgtt2k0e.apps.googleusercontent.com"
                    buttonText={props.strings.menuLogin}
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                />
            </Card.Header>
            <Card.Body>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    let object = props.user?
                        Object.assign(props.user, {nickname: nickname, description: description})
                        :{nickname: nickname, description: description};
                    props.setUser(object)}}
                >
                    <Form.Group as={Row}>
                        <Form.Label>
                            Nickname
                        </Form.Label>
                        <Form.Control disabled={!edit} type="text" onChange={(e) => {setNickname(e.target.value)}} value={nickname}/>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label>
                            Description
                        </Form.Label>
                        <Form.Control disabled={!edit} type="text" onChange={(e) => {setDescription(e.target.value)}} value={description}/>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Button onClick={() => {if (props.user) setEdit(!edit)}}>
                            Change
                        </Button>
                        <Button type="submit">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}