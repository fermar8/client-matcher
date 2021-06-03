import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import './../styles/navbar.css';

function Navbar () {

    return (
        <div style={{width: "100vw"}}fluid={true} >
            <Row className="navbar-barra">
            <Col xs="3" className="navbar-icon">
            <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-home"></i>
            </Col>
            <Col xs="3" className="navbar-icon">
            <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i>
            </Col>
            <Col xs="3" className="navbar-icon">
            <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-comments"></i>
            </Col>
            <Col xs="3" className="navbar-icon">
            <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-user"></i>
            </Col>
            </Row>
        </div>
    )
}

export default Navbar;