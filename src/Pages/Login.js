import React from 'react'
import { Form, FormGroup, Label, Input,
     Container, Row, Col } from 'reactstrap';
import imgPerfil from './../images/img-perfil.png';
import { RedButton } from './../Components/RedButton';
import './../styles/login.css';


function Login() {
    return (
        <Container fluid={true} style={{height: "100vh", width: "100%"}}>
        <Row>
        <Col xs="12" className="login-flex">
        <h1 className="login-title">INICIA SESIÓN</h1>
        <img className="login-img" alt="foto-perfil" src={imgPerfil}></img>
        <Form>
            <FormGroup>
                <Label className="login-label">Correo electrónico</Label>
                <Input className="login-input" type="text" placeholder="Introduce tu correo electrónico"></Input>
            </FormGroup>
            <FormGroup>
                <Label className="login-label">Contraseña</Label>
                <Input className="login-input" type="password" placeholder="Introduce tu contraseña"></Input>
            </FormGroup>
            
            <FormGroup className="login-button">
            <RedButton>Inicia sesión</RedButton>
            </FormGroup>

        </Form>
        </Col>
        </Row>
        </Container>
    )
}

export default Login
