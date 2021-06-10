import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '../context/auth-context';
import { Container, Row, Col } from 'reactstrap';
import './../styles/navbar.css';

function Navbar (props) {

    return (
            <Row className="navbar-barra">
            <Col xs="3" className="navbar-icon">
            <a href="/editaperfil"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-user"></i></a>
            </Col>
            <Col xs="3" className="navbar-icon">
            <a href="/chat"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-comments"></i></a>
            </Col>
            <Col xs="3" className="navbar-icon">
            <a href="/landing"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i></a>
            </Col>
            <Col xs="3" className="navbar-icon">
            <a href="/"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-home"></i></a>
            </Col>
            </Row>
    )
}

export default withAuth(Navbar);