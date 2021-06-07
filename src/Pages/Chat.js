import React from 'react'
import { Container, Row, Col } from 'reactstrap';

import NavBar from '../Components/NavBar';
import './../styles/landing.css';

function Chat() {
    return (
        <Container fluid={true} className="landing-container">
        <Row>
        <Col className="landing-flex">
            <p>CHAT</p>
        </Col>
        </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default Chat
