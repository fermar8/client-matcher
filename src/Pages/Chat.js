import React, { useState, useRef } from 'react'
import { Container, Row, Col, Dropdown, 
       DropdownToggle, DropdownMenu, DropdownItem,
       Form, FormGroup, Label, Input } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import NavBar from '../Components/NavBar';
import { RedButton } from './../Components/RedButton';
import { DarkButton } from './../Components/DarkButton';
import './../styles/chat.css';

function Chat(props) {

const [ openElimina, setOpenElimina ] = useState(false);
const [ openReporta, setOpenReporta ] = useState(false);
const [ dropdownOpen, setDropdownOpen ] = useState(false);
const [ fileMessage, setFileMessage ] = useState("Sin archivo seleccionado")
const [ captura, setCaptura ] = useState();
const inputEl = useRef();

const handleClick = () => {
    inputEl.current.click();
};

const handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files);
    const file = e.target.files[0];
    setFileMessage(file)
    console.log(URL.createObjectURL(file))
    setCaptura(URL.createObjectURL(file));
}

const toggle = () => setDropdownOpen(prevState => !prevState)

    return (
        <Container fluid={true} className="chat-container">
            <Row>
                <Col xs="12">
                 <div className="chat-flex">
                    <p className="chat-title">Conversación con {props.location.dades}</p>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle style={{backgroundColor: "#0F1923", border: "none"}}>
                    <i style={{color: "#FF4655"}} className="fas fa-ellipsis-v"></i>
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem onClick={() => setOpenElimina(!openElimina)} style={{fontFamily: "DIN"}}>Eliminar</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem onClick={() => setOpenReporta(!openReporta)} style={{fontFamily: "DIN"}}>Reportar y bloquear</DropdownItem>
                    </DropdownMenu>
                    </Dropdown>
                </div>
                </Col>
                {openElimina ?
                <Col className="chat-report" xs="12">
                    <div className="chat-modal">
                        <p>¿Estás seguro que deseas eliminar a {props.location.dades} de tu lista de matches?</p>
                        <DarkButton onClick={() => setOpenElimina(!openElimina)}>Cancelar</DarkButton>
                        <RedButton onClick={() => setOpenElimina(!openElimina)}>Eliminar</RedButton>
                    </div>
                </Col> 
                : null }

                {openReporta ?
                <Col className="chat-report" xs="12">
                    <Form className="chat-denuncia">
                        <FormGroup style={{width: "100%"}}>
                            <Label className="chat-label" for="selectMotivo">Por favor, indica el motivo de tu reporte:</Label>
                            <Input style={{fontFamily: "DIN"}} type="select" name="select" id="selectMotivo">
                                <option>Acoso y mensajes inapropiados</option>
                                <option>Contenido inapropiado</option>
                                <option>Spam</option>
                            </Input>
                        </FormGroup>
                        <FormGroup style={{width: "100%"}}>
                            <Label className="chat-label" for="infoAdicional">Añade información adicional:</Label>
                            <Input className="chat-textarea" type="textarea" name="text" id="infoAdicional" />
                        </FormGroup>
                        <div className="chat-div-upload">
                        <Label className="chat-label" for="file">Sube una captura de pantalla</Label>
                            <button type="button" className="chat-file-button" onClick={handleClick}>Añadir captura</button>
                            <input className="chat-file" type="file" ref={inputEl} onChange={handleFileUpload}/>
                            <p className="chat-p-archivo">{fileMessage.name}</p>
                        </div>
               
                        <p className="chat-p">¿Estás segur@ que deseas enviar esta denuncia?</p>
                        <DarkButton onClick={() => setOpenReporta(!openReporta)}>Cancelar </DarkButton>
                        <RedButton onClick={() => setOpenReporta(!openReporta)}>Enviar y Bloquear </RedButton>
                    </Form>
                </Col> 
                : null }
                  
            </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(Chat)
