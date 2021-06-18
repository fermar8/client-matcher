import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Form, FormGroup, Label, Input,
     Container, Row, Col } from 'reactstrap';
import { withAuth } from '../context/auth-context';
import imgPerfil from '../images/img-perfil.png'
import { RedButton } from '../Components/RedButton';
import { DarkButton } from '../Components/DarkButton';
import { Link } from 'react-router-dom';
import { getUserInfo } from './../services/user.service';
import { editUserPerf } from './../services/editPerf.service';

import './../styles/login.css';
import './../styles/signup.css';

function EditaPerfil(props) {

    const [ user, setUser ] = useState(props.user);
    const [ userInfo, setUserInfo ] = useState([{}])
    const [ image, setImage ] = useState("");
    const [ nom, setNom ] = useState("");
    const [ details, setDetails ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ server, setServer ] = useState("");
    const [ rolPred, setRolPred ] = useState("");
    const [ name, setName ] = useState("")

    const inputEl = useRef();

let fetchData = useCallback(async (id) => {
const result = await getUserInfo(id);
const body = await result.data;
setUserInfo(body);

}, [])

useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
    fetchData(currentUser.id)
}, [])

async function handleSubmit (e) {
        await editUserPerf({
            nom,
            details,
            username,
            server,
            rolPred,
            name,
            userInfo,
            image
        }) 
 }


const handleClick = () => {
    inputEl.current.click();
};

const handleNomChange = (e) => {
    setNom(e.target.value);
}

const handleDetailsChange = (e) => {
    setDetails(e.target.value);
}

const handleUsernameChange = (e) => {
    setUsername(e.target.value);
}

const handleServerChange = (e) => {
    setServer(e.target.value);
}

const handleRolPredChange = (e) => {
    setRolPred(e.target.value);
}

const handleNameChange = (e) => {
    setName(e.target.value);
}

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
                <img className="login-img" alt="foto-perfil" src={imgPerfil}></img>
                <Label for="file">
                <button className="signup-file-button" onClick={handleClick}>+</button>
                <input className="signup-file" type="file" ref={inputEl} onChange={handleFileUpload}/>
                </Label>
            </div>

        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label className="login-label">Nombre</Label>
                <Input className="login-input" type="text" onChange={(e) => handleNomChange(e)}  name="nom" placeholder={userInfo.nom}></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Introduce una frase que te identifique</Label>
                <Input className="login-input" type="text" onChange={(e) => handleDetailsChange(e)}  name="details" placeholder={userInfo.details}></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Correo electrónico</Label>
                <Input className="login-input" type="text" onChange={(e) => handleUsernameChange(e)}  name="username" placeholder={userInfo.username}></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Servidor</Label>
                <Input className="login-input" type="text" onChange={(e) => handleServerChange(e)}  name="server" placeholder={userInfo.server}></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Rol preferido</Label>
                <Input className="login-input" type="text" onChange={(e) => handleRolPredChange(e)} name="rolPred" placeholder={userInfo.rolPred}></Input>
            </FormGroup>

            <FormGroup>
                <Label className="login-label">Nombre de Invocador</Label>
                <Input className="login-input" type="text"  onChange={(e) => handleNameChange(e)} name="name" placeholder={userInfo.name}></Input>
            </FormGroup>
                        
            <FormGroup className="signup-button">
            <RedButton type="button" className="signup-botopassw">Cambia tu contraseña</RedButton>
            </FormGroup>

            <FormGroup className="signup-button">
            <Link to={'/landing'}><DarkButton type="button" onClick={(e) => editUserPerf(e)}>Edita tu Perfil</DarkButton></Link>
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
