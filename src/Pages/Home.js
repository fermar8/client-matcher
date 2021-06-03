import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';
import { DarkButton } from './../Components/DarkButton';
import './../styles/home.css';

function Home() {
    return (
        <Container fluid={true} style={{height: "100vh", width: "100%"}}>
            <Row>
            <Col xs="1"></Col>
            <Col xs="10" className="home-flex">
                <h1 className="home-title">MATCHER</h1>
            
                <p className="home-text">Encuentra compañeros para jugar al League of Legends.</p>
            
                <Link to={'/login'}><DarkButton>Inicia sesión</DarkButton></Link>
            
                <Link to={'/signup'}><DarkButton>Regístrate</DarkButton></Link>
            </Col>
            <Col xs="1"></Col>
            </Row>
            
        </Container>
    )
}

export default Home
