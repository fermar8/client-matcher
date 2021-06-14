import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './../styles/navbar.css';

function NavbarS () {

    return (
            <Row className="navbars-barra d-none d-sm-flex">
            <Col xs="4" className="navbars-icon">
            <h1 className="home-title">MATCHER</h1>
            </Col>  
            <Col xs="4" className="navbars-icon">
            </Col>   
            <Col xs="1" className="navbars-icon">
            <a href="/"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-home"></i></a>
            </Col>
            <Col xs="1" className="navbars-icon">
            <a href="/landing"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i></a>
            </Col>
            <Col xs="1" className="navbars-icon">
            <a href="/chat"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-comments"></i></a>
            </Col>
            <Col xs="1" className="navbars-icon">
            <a href="/editaperfil"><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-user"></i></a>
            </Col>
            </Row>
    )
}

export default NavbarS;