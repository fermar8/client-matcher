import React from 'react'
import { Container, Row, Col } from 'reactstrap';
import lolImg from './../images/lol-img.png';
import { RedButton } from './../Components/RedButton';

import './../styles/landing.css';

function Landing() {
    return (
        <Container fluid={true} className="landing-container">
        <Row>
        <Col className="landing-flex">
                 <button className="landing-explora-btn">
                 <span className="landing-explora-text">Explora</span> 
                 <i style={{color: "#FF4655", marginRight: "8px"}} className="fas fa-search"></i> 
                 </button>

                 <p className="landing-buscando">Actualmente buscando:</p>

                 <div className="landing-div">
                     <img className="landing-img" src={lolImg} alt="imagen-lol"></img>
                     <div>
                         <p className="landing-lol">League of Legends</p>
                         <p className="landing-modo-sel">Sin modo selecionado - Tod@s l@s jugador@s</p>
                     </div>
                 </div>

                 <p className="landing-info">Hemos añadido esta categoría de acuerdo a tus parámetros de búsqueda.</p>
                 <p className="landing-edita">Edita tus parametros aquí</p>

                 <RedButton className="landing-redbtn">Modificar preferencias</RedButton>
        </Col>
        </Row>
        </Container>
    )
}

export default Landing
