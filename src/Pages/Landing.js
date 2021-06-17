import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import lolImg from './../images/lol-img.png';
import { withAuth } from './../context/auth-context';
import { RedButton } from './../Components/RedButton';

import NavBar from './../Components/NavBar';
import NavBarS from './../Components/NavBarSuperior';
import './../styles/landing.css';

function Landing(props) {

const [ user, setUser ] = useState(props.user)

useEffect(() => {
    let currentUser = JSON.parse(localStorage.getItem('user'));

    if (currentUser != null) {
      setUser(currentUser)
    }
}, [])

    return (
        <Container fluid={true} className="landing-container">
        <NavBarS></NavBarS> 
            <Row>
                <Col xs="12" className="landing-flex">
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

                        <Link className="landing-link-modo" to={'/modo'}><RedButton className="landing-redbtn">Modificar preferencias</RedButton></Link>
                </Col>
            </Row>
        <NavBar></NavBar>
        </Container>
    )
}

export default withAuth(Landing)
