import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import './../styles/modo.css';

function Modo() {
    return (
        <Container fluid={true} className="modo-container">
        <Row>
            <Col xs="12" className="modo-flex">
                <div className="modo-div">
                    <p className="modo-text">¿Qué te apetece jugar?</p>
                    <i style={{color: "#FF4655"}} className="fas fa-angle-down"></i>
                </div>

                <Link to={'/landing'}><i className="fas fa-arrow-left"></i></Link>

                <button className="modo-saltar">Saltar</button>

                <h2 className="modo-title">Modo</h2>

                <div>
                

                </div>
                
            </Col>
        </Row>
        </Container>
    )
}

export default Modo
