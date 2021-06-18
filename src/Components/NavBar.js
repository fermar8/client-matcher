import React from 'react';
import { withAuth } from '../context/auth-context';
import { Link } from 'react-router-dom'
import { Row, Col } from 'reactstrap';
import './../styles/navbar.css';

function Navbar (props) {

    return (
            <Row className="navbar-barra">
            <Col xs="3" className="navbar-icon">
            <Link to={"/editaperfil"}><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-user"></i></Link>
            </Col>
            <Col xs="3" className="navbar-icon">
            <Link to={"/matches"}><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-comments"></i></Link>
            </Col>
            <Col xs="3" className="navbar-icon">
            <Link to={"/landing"}><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i></Link>
            </Col>
            <Col xs="3" className="navbar-icon">
            <Link to={"/"}><i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-home"></i></Link>
            </Col>
            </Row>
    )
}

export default withAuth(Navbar);