import React, {useEffect, useState} from "react";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import {GoogleLogin, GoogleLogout} from 'react-google-login';
import {sign} from "../../functions/user";
import {useCookies} from 'react-cookie'
import {CardImg} from "react-bootstrap";
export default function(props) {
    const [name, setName] = useState(props.user? props.user.name : '');
    const [edit, setEdit] = useState(false);
    const [cookie, setCookie] = useCookies(['token'])
    const responseFail = (response) => {
        console.log(response)
    }
    const logout = () => {
        setCookie('token', null);
        props.setUser(null)
    }
    const responseGoogle = (response) => {
        let tokenId = response['tokenId'];
        setCookie('token', tokenId);
        sign(tokenId).then(user => {
            props.setUser(user);
        }).catch(err => {
            console.log(err);
        });
    };
    return (<>
        <Card size="sm" sm={2}>

            { props.user?<CardImg variant="0" width="200" height='200' src={props.user.picture}/>  : ""}

            <Card.Header>
                {props.user?
                    <GoogleLogout
                        clientId="698996094926-54843vcf6corbeq47f6iqpr1dgtt2k0e.apps.googleusercontent.com"
                        buttonText={props.strings.menuLogout}
                        onLogoutSuccess={logout}
                    >
                    </GoogleLogout>
                    :<GoogleLogin
                    clientId="698996094926-54843vcf6corbeq47f6iqpr1dgtt2k0e.apps.googleusercontent.com"
                    buttonText={props.strings.menuLogin}
                    onSuccess={responseGoogle}
                    onFailure={responseFail}
                />}
            </Card.Header>
            <Card.Body>
                <Form style={{display: 'block'}}
                    onSubmit={(e) => {
                    e.preventDefault();
                    let object = props.user?
                        Object.assign(props.user, {name: name})
                        :{name: name};
                    props.setUser(object)}}

                >

                    <Form.Group as={Row}>
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control disabled={!edit} type="text" style={{marginLeft: "20px", width: "180px"}} onChange={(e) => {setName(e.target.value)}} value={name}/>
                    </Form.Group>
                    <Form.Group style={{height: "20px", margin: "30px 0 0 50px"}} as={Row}>
                        <Button style={{marginRight: "20px"}} onClick={() => {if (props.user) setEdit(!edit)}}>
                            {props.strings.change}
                        </Button>
                        <Button type="submit">Save</Button>
                    </Form.Group>
                </Form>
            </Card.Body>
        </Card>
        </>
    )
}