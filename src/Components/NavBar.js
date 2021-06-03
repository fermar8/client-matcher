import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';


function Navbar (props) {

    return (
        <Container fluid={true} >
            <Row>
            <Col xs="3" style={{padding: 0, margin: 0}}>

            </Col>
            <Col xs="3" style={{padding: 0, margin: 0}}>

            </Col>
            <Col xs="3" style={{padding: 0, margin: 0}}>

            </Col>
            <Col xs="3" style={{padding: 0, margin: 0}}>

            </Col>
            </Row>
        </Container>
    )
}

export default Navbar;