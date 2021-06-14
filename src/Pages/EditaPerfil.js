import React, { useState, useRef } from 'react';
import { Form, FormGroup, Label, Input,
     Container, Row, Col } from 'reactstrap';
import { withAuth } from '../context/auth-context';
import { RedButton } from '../Components/RedButton';
import { DarkButton } from '../Components/DarkButton';
import imgPerfil from './../images/img-perfil.png';

import './../styles/login.css';
import './../styles/signup.css';

function EditaPerfil(props) {

    const [ image, setImage ] = useState(imgPerfil);
    const inputEl = useRef();

const handleClick = () => {
    inputEl.current.click();
};

const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];
    console.log(URL.createObjectURL(file))
    setImage(URL.createObjectURL(file));
}

    return (
        <Container fluid={true} className="signup-container">
        <Row>
        <Col xs="12" className="signup-flex">
        <h1 className="login-title">Edita tu Perfil</h1>
            <div className="signup-div-upload">
                <img className="login-img" alt="foto-perfil" src={image}></img>
                <Label for="file">
                <button className="signup-file-button" onClick={handleClick}>+</button>
                <input className="signup-file" type="file" ref={inputEl} onChange={handleFileUpload}/>
                </Label>
            </div>

        <Form>
            <FormGroup>
                <Label className="login-label">Nombre</Label>
                <Input className="login-input" type="text" placeholder="Introduce tu nombre"></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Edad</Label>
                <Input className="login-input" type="number" placeholder="Introduce tu edad"></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Correo electrónico</Label>
                <Input className="login-input" type="text" placeholder="Introduce tu correo electrónico"></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Servidor</Label>
                <Input className="login-input" type="text" placeholder="Elige tu servidor"></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Rol preferido</Label>
                <Input className="login-input" type="text" placeholder="Elige tu rol preferido"></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Nombre de Invocador</Label>
                <Input className="login-input" type="text" placeholder="Introduce tu nombre de invocador"></Input>
            </FormGroup>
                        
            <FormGroup className="signup-button">
            <RedButton className="signup-botopassw">Cambia tu contraseña</RedButton>
            </FormGroup>

            <FormGroup className="signup-button">
            <DarkButton>Edita tu perfil</DarkButton>
            </FormGroup>

            <FormGroup>
                <button type="button" onClick={props.logout}>Logout</button>
            </FormGroup>
            

        </Form>
        </Col>
        </Row>
        </Container>
    )
}

export default withAuth(EditaPerfil)
