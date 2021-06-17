import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { withAuth } from './../context/auth-context';
import './../styles/chat.css';
import NavBar from './../Components/NavBar';
import NavBarS from './../Components/NavBarSuperior';

function Chat(props) {
    return (
        <Container fluid={true} className="chat-container">
            <NavBarS></NavBarS>
            <Row>
                <Col xs="12">
                 <div className="chat-flex">
                    <p className="chat-title">Conversación con {props.location.dades}</p>
                    <i  style={{color: "#FF4655"}} className="fas fa-ellipsis-v"></i>
                </div>
                </Col>
            </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(Chat)
