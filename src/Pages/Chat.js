import socket from './Socket';
import React, { useState, useRef, useEffect, useCallback } from 'react';
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
const [ conversation, setConversation] = useState(null);
const [ allMessages, setAllMessages ] = useState([]);
const [ message, setMessage ] = useState("");


const [ openElimina, setOpenElimina ] = useState(false);
const [ openReporta, setOpenReporta ] = useState(false);
const [ dropdownOpen, setDropdownOpen ] = useState(false);
const [ fileMessage, setFileMessage ] = useState("Sin archivo seleccionado")
const [ captura, setCaptura ] = useState();
const inputEl = useRef();
const scrollRef = useRef();
const btnEl = useRef();

useEffect(() => {
    socket.on('connect', () => {
        console.log(`You connected with id: ${socket.id}`)
    })
  }, []);
 
useEffect(() => {
    let mounted = true;
    socket.on('receiveMessage', message => {
      if (allMessages && mounted) {
         setAllMessages(prev => [...prev, message])
        } else {
            console.log(message)
        }
    })
        
    return function cleanup () {
        mounted = false;
    }
}, [])

let fetchData = useCallback(async (id) => {
    const result = await getAllMessages(id);
    if (result){
        const body = await result.data;
        setAllMessages(body);
    } else {
        setAllMessages([{}])
    }
}, [conversation])

useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (currentUser != null) {
      setUser(currentUser)
    }
    setConversation(props.location.dades)
    fetchData(props.location.dades.id);
}, [])

const scrollToBottom = () => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
}

useEffect(() => {
    scrollToBottom()
  }, [allMessages]);


const handleMessageChange = (e) => {
    setMessage(e.target.value);
};

async function defineEmisorReceptor (e) {

    let receiverId;
    let emisorId;
    if (user.id === conversation.user_Id_creador) {
        receiverId = conversation.user_Id_segon;
        emisorId = conversation.user_Id_creador
    } else {
        receiverId = conversation.user_Id_creador;
        emisorId = conversation.user_Id_segon;
    }
    handleSubmitMessage(receiverId, emisorId)
}



async function handleSubmitMessage (receiverId, emisorId) {

socket.emit('sendMessage', {
    useridemisor: emisorId,
    useridreceptor: receiverId,
    message
})

try {
   const response =  await postMessage({
        conversation,
        emisorId,
        receiverId,
        message
    }) 
    setMessage("");
    } catch (err) {
        console.log(err)
    }
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
                  {allMessages.map(el => {
                      return (
                      <div key={el.id} className={el.useridemisor === user.id ? "chat-user" : "chat-receptor"}>
                          <p style={{margin: "2px"}}>{el.message}</p>
                      </div>
                      )
                  })}
                     <div ref={scrollRef}></div>
                
                </Col>
                <Col xs="12">
                    <Form className="escribe-mensaje">
                        <div style={{width: "80vw"}}>
                            <Input type="textarea" className="msg" onChange={(e) => handleMessageChange(e)} value={message} name="message" placeholder="Escribe tu mensaje"></Input>
                        </div>
                        <div style={{display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#fafafa", width: "10vw", marginLeft: "8px"}}>
                           <i onClick={(e) => defineEmisorReceptor (e)} className="fas fa-paper-plane"><button style={{display: "none"}}></button></i>
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
