import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Container, Row, Col, Dropdown, 
       DropdownToggle, DropdownMenu, DropdownItem,
       Form, FormGroup, Label, Input } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import { getAllMessages, postMessage } from '../services/conversa.service';
import { RedButton } from './../Components/RedButton';
import { DarkButton } from './../Components/DarkButton';
import './../styles/chat.css';

function Chat(props) {

const [ user, setUser ] = useState();
const [ message, setMessage ] = useState("");
const [ allMessages, setAllMessages ] = useState([{}]);
const [ conversation, setConversation ] = useState({})
const [ openElimina, setOpenElimina ] = useState(false);
const [ openReporta, setOpenReporta ] = useState(false);
const [ dropdownOpen, setDropdownOpen ] = useState(false);
const [ fileMessage, setFileMessage ] = useState("Sin archivo seleccionado")
const [ captura, setCaptura ] = useState();
const inputEl = useRef();
const btnEl = useRef();

let fetchData = useCallback(async (id) => {
    const result = await getAllMessages(id);
    if (result){
        const body = await result.data;
        setAllMessages(body);
    } else {
        setAllMessages([{}])
    }
}, [])

useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser != null) {
      setUser(currentUser)
    }
    setConversation(props.location.dades)
    fetchData(props.location.dades.id);
}, [])

const handleMessageChange = (e) => {
    setMessage(e.target.value);
};

async function handleSubmitMessage (e) {

let receiverId;
if (user.id === conversation.user_Id_creador) {
    receiverId = conversation.user_Id_segon
} else {
    receiverId = conversation.user_Id_creador
}
    await postMessage({
        conversation,
        receiverId,
        message
    }) 
}

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
                    <p className="chat-title">Conversación con {props.location.dades.nom}</p>
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
                <Col xs="12">

                </Col>
                <Col xs="12">
                    <Form className="escribe-mensaje">
                        <div style={{width: "80vw"}}>
                            <Input type="textarea" className="msg" onChange={(e) => handleMessageChange(e)}  name="message" placeholder="Escribe tu mensaje"></Input>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa", width: "10vw", marginLeft: "8px"}}>
                           <i onClick={(e) => handleSubmitMessage (e)} className="fas fa-paper-plane"><button style={{display: "none"}}></button></i>
                        </div>
                    </Form>
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
        </Container>
    )
}

export default withAuth(Chat)
